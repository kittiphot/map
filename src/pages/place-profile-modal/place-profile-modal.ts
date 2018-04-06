import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-place-profile-modal',
  templateUrl: 'place-profile-modal.html',
})
export class PlaceProfileModalPage {

  itemsRef: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase, //ต่อดาต้าเบส
    private viewCtrl: ViewController
  ) {
    this.itemsRef = this.afDatabase.list('placeProfile')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceProfileModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss('close')
  }

}
