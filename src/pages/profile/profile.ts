import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	profile = {} as Profile;

  constructor(private toastCtrl: ToastController, private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  createProfile(){
  	this.afAuth.authState.take(1).subscribe(auth=>{
  		this.afDatabase.list(`profile/${auth.uid}`).push(this.profile);
  	})
  	this.toastCtrl.create({
        message: `Team Added To Log`,
        duration: 3000,
      }).present();
  }

  goBack(){
    this.navCtrl.setRoot('LoginPage');
    this.toastCtrl.create({
        message: `You have logged out`,
        duration: 3000,
      }).present();
  }

}