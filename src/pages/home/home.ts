import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from 'angularfire2/database';

import { PlaceProfilePage } from '../place-profile/place-profile';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("map") mapElement: ElementRef;
  private map: any;
  private itemsRef: any;
  private userPosition: any;

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase, //ต่อดาต้าเบส
    private geolocation: Geolocation
  ) {
    this.itemsRef = this.afDatabase.list('placeProfile')
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.userPosition = {
        lat: resp.coords.latitude,
        long: resp.coords.longitude
      }
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    this.loadMap();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(16.245616, 103.250208);

    let mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: true,
      fullscreenControl: false
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.getPlaceProfiles();
  }

  getPlaceProfiles() {
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(values => {
        let params = {
          id: values.key,
          name: values.payload.val()['name'],
          lat: values.payload.val()['lat'],
          long: values.payload.val()['long']
        }
        let distance = this.getDistanceBetweenPoints(params).toFixed(2)
        console.log(distance)
        this.addMarker(params, distance)
      });
    });
  }

  addMarker(params, distance) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      // position: this.map.getCenter()
      position: new google.maps.LatLng(params.lat, params.long)
    });

    // let content = "<h4>Information!</h4>";
    let myLinkLocation = 'geo:' + params.lat + ',' + params.long + '?q=' + params.name;
    let content = "<h5>" + params.name + "</h5>" + distance + "<br>" + "<a target='_blank' jstcache='6' href=" + myLinkLocation + "> <span>ดูใน Google Maps </span> </a>";

    this.addInfoWindow(marker, content, params);
  }

  addInfoWindow(marker, content, params) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, "click", () => {
      infoWindow.open(this.map, marker);
    });
  }

  goToPlaceProfilePage() {
    this.navCtrl.push(PlaceProfilePage);
  }

  getDistanceBetweenPoints(end) {

    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };

    let R = earthRadius['km' || 'miles'];
    let lat1 = this.userPosition.lat;
    let lon1 = this.userPosition.long;
    let lat2 = end.lat;
    let lon2 = end.long;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

  }

  toRad(x) {
    return x * Math.PI / 180;
  }

}
