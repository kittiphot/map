import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-place-profile-modal',
  templateUrl: 'place-profile-modal.html',
})
export class PlaceProfileModalPage {

  itemsRef: any;
  params: any
  id: any

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
    this.getPlaceProfiles();
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
