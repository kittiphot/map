import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

import { PlaceProfilePage } from '../place-profile/place-profile';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("map") mapElement: ElementRef;
  map: any;
  itemsRef: any;

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase, //ต่อดาต้าเบส
  ) {
    this.itemsRef = this.afDatabase.list('placeProfile')
  }

  ionViewDidLoad() {
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
        this.addMarker(params);
      });
    });
  }
  
  addMarker(params) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      // position: this.map.getCenter()
      position: new google.maps.LatLng(params.lat, params.long)
    });

    // let content = "<h4>Information!</h4>";
    let content = params.name;

    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content) {
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

}
