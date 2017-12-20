import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from '../../model/userInfo'
import { FIREBASE_CONFIG } from '../../app/app.firebase.config';
import {AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

    user = new UserInfo();

    constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private toast: ToastController, private fdb:AngularFireDatabase) {
  }


  saveUserData(){

    var database =this.fdb.list('/users/').push({Name:this.user.firstName,Gender:this.user.gender,Mobile:this.user.mobile});
    console.log('Saved');
  }

  getUser(){
      return this.fdb.list('/users/');
  }

  removeUser(id){
    var database =this.fdb.list('/users/').remove(id);
  }

  ionViewDidLoad() {
      this.afAuth.authState.subscribe(data => {
          console.log(data);
          if (data && data.email && data.uid) {
              this.toast.create({
                  message: `Welcome to My App,  ${data.email}`, duration: 5000
              }).present();
          }
          else {
              this.toast.create({
                  message: 'Could not finf Authentication details', duration: 5000
              }).present();


          }
      })
  }

}
