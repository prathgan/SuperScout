import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth} from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginErrorString: string;

  user = {} as User;

  constructor(private toastCtrl: ToastController, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

 async login(user:User){

  try{
  const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  console.log("Success!!!")
  console.log(result);
  this.navCtrl.push('ProfilePage');
  this.toastCtrl.create({
        message: `Welcome to SuperScout`,
        duration: 3000,
      }).present();
  }
  catch(e){
    console.error(e);
    if(e=="Error: There is no user record corresponding to this identifier. The user may have been deleted."){
      console.log("username no good");
      this.loginErrorString = "We can't find this user, please check the email and try again, or register a new account";
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    if(e=="Error: The password is invalid or the user does not have a password."){
      console.log("password no good");
      this.loginErrorString = "The password seems to be wrong, please check it and try again";
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

  register(){
    this.navCtrl.push('RegisterPage');
  }

}
