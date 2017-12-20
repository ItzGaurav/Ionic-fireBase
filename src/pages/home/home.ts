import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserInfo } from '../../model/userInfo'
import { RegisterPage } from '../register/register';
import { WelcomePage } from '../welcome/welcome';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    user = new UserInfo();
    constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    }

    async login(user: UserInfo) {
        try {
            const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
            console.log(result);
            if (result.uid) {
                this.navCtrl.setRoot(WelcomePage);
            }

        } catch (e) {
            console.log(e);
            this.showAlert();
        }

    }


    showAlert() {
        let alert = this.alertCtrl.create({
            //title: 'Please Enter correct EmialId and Password!',
             subTitle: 'Please Enter correct Emial Address and Password!!',
            buttons: ['OK']
        });
        alert.present();
    }


    register() {
        this.navCtrl.push(RegisterPage);
    }


}
