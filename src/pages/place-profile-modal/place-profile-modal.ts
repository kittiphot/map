import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

declare var google;

@Component({
  selector: 'page-place-profile-modal',
  templateUrl: 'place-profile-modal.html',
})
export class PlaceProfileModalPage {

  @ViewChild("map") mapElement: ElementRef;
  private map: any;
  private itemsRef: any;
  private params: any
  private id: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase, //ต่อดาต้าเบส
    private viewCtrl: ViewController
  ) {
    this.itemsRef = this.afDatabase.list('placeProfile')
    this.id = navParams.get('id')
    this.params = {
      name: '',
      lat: '',
      long: ''
    }
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(16.245616, 103.250208);

    let mapOptions = {
      center: latLng,
      zoom: 15,
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

    google.maps.event.addListener(this.map, "click", (event) => {
      console.log(event.latLng.lat());
      console.log(event.latLng.lng());
    });
  }

  getPlaceProfiles() { 
    this.itemsRef.snapshotChanges().subscribe(data => {
      data.forEach(data => {
        if (this.id == data.key) {
          this.params.name = data.payload.val()['name']
          this.params.lat = data.payload.val()['lat']
          this.params.long = data.payload.val()['long']
        }
      });
    });
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

  onSubmit(myform) {
    let params = myform.value
    if (typeof this.id == 'undefined') {
      this.itemsRef.push(params)
    } 
    else {
      this.itemsRef.update(
        this.id, {
          name: params.name,
          lat: params.lat,
          long: params.long
        }
      );
    }
    this.closeModal()
  }

}
