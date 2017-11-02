import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  newTeam(){
  	this.navCtrl.push('ProfilePage');
  }

  matchStats(){
  	this.navCtrl.push('MatchPage');
  }

  logOut(){

  }

}
