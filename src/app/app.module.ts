import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlaceProfilePage } from '../pages/place-profile/place-profile';
import { PlaceProfileModalPage } from '../pages/place-profile-modal/place-profile-modal';

export const firebaseConfig = {
  apiKey: "AIzaSyBYXy67zuFZfvBN2jT6lOrfFbdg_Y2Dph8",
  authDomain: "map-api-195010.firebaseapp.com",
  databaseURL: "https://map-api-195010.firebaseio.com",
  projectId: "map-api-195010",
  storageBucket: "map-api-195010.appspot.com",
  messagingSenderId: "392474629206"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlaceProfilePage,
    PlaceProfileModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlaceProfilePage,
    PlaceProfileModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
