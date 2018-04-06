import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-place-profile',
  templateUrl: 'place-profile.html',
})
export class PlaceProfilePage {

  items: any;
  // itemsRef: AngularFireList<any>;
  itemsRef: any;

  constructor(
    public navCtrl: NavController,
    private afDatabase: AngularFireDatabase, //ต่อดาต้าเบส
    private loadingCtrl: LoadingController
  ) {
    this.items = []
    this.itemsRef = this.afDatabase.list('test')
  }

  ionViewDidLoad() {
    this.getPlaceProfiles();
  }

  getPlaceProfiles() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    })
    loading.present()
    // this.afDatabase.list('/test').valueChanges().subscribe(data => this.items = data);
    // this.afDatabase.list('/test').valueChanges().subscribe(data => console.log(data));    
    this.itemsRef.snapshotChanges().subscribe(data => {
      this.items = []
      data.forEach(data => {
        // console.log(data.type);
        // console.log(data.key);
        // console.log(data.payload.val());
        this.items.push({
          id: data.key,
          name : data.payload.val()['test']
          // name: data.payload.val()['name'],
          // lastname: data.payload.val()['lastname']
        })
        // console.log(this.items);
      });
      loading.dismiss()
    });
  }

}
