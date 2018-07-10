import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { AuthData } from '../../providers/auth-data';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  public backgroundImage: any = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802.jpg?alt=media&token=d3079014-9b17-4310-adc8-a20c3fb3b87b";

  payload: string;
  login: boolean;

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private nfc: NFC,
    public authData: AuthData) {
      this.afAuth.authState.subscribe((user)=>{
        if(user){
          this.login = true;
        }
        else{
          this.login = false;
        }
      })

    // this.nfc.addMimeTypeListener('jjun/read', () => {
    //   console.log('nfc attached')
    // }, (err) => {
    //   console.log('error attaching ndef listener', err);
    // }).subscribe((event) => {

    //   // this.payload = this.nfc.bytesToString(event.tag.ndefMessage[0].payload);

    //   // this.afAuth.authState.subscribe((user)=>{
    //   //   if(user==null){
    //   //     alert("로그인이 필요합니다.");
    //   //   }
    //   //   else{
    //   //     // alert("로그인 되었습니다")
    //   //     this.navCtrl.push('LocationManagePage', {
    //   //       payload: this.payload
    //   //     })
    //   //   }
    //   // }

    // });

    // console.log(this.authData.isLoggedIn());
  }
  googleLogin() {
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.authData.googleLogin().then(()=>{
      this.navCtrl.setRoot('HomePage');
    });
  }

  loginWithEmail() {
    this.navCtrl.push('LoginPage');
  }

  createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  logout() {
    this.afAuth.auth.signOut()
  }


}

