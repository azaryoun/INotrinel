import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from './../tabs/tabs'

import { HomeComponent } from './../home/home-component'

import { LoginComponent } from './../login/login-component'

@Component({
  selector: 'welcome-component',
  templateUrl: 'welcome-component.html'
})
export class WelcomeComponent {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  doPageSignup() {
    // this.navCtrl.push(SignupPage);
  }

  doPageLogin() {
    //this.navCtrl.setRoot(TabsPage);

    this.navCtrl.push(LoginComponent);
  }

}
