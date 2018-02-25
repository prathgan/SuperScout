import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth} from 'angularfire2/auth';


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
private loginErrorString: string;
  user = {} as User;

  constructor(private toastCtrl: ToastController, private afAuth:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user:User){

  try{
  const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  console.log(result);
  this.loginErrorString = "Registration successful!";
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.setRoot('LoginPage');
  }
  catch(e){
    console.error(e);
    if(e=="Error: Password should be at least 6 characters"){
      this.loginErrorString = "Passwords need to be at least 6 characters";
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    if(e=="Error: A network error (such as timeout, interrupted connection or unreachable host) has occurred."){
      this.loginErrorString = "Please check your network";
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    
  }
  }


}
