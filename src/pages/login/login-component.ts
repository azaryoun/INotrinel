import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'login-component',
  templateUrl: 'login-component.html'
})
export class LoginComponent {

  masks: any;

  phoneNumber: any = "";
  cardNumber: any = "";
  cardExpiry: any = "";
  orderCode: any = "";

  constructor(public navCtrl: NavController) {

    this.masks = {
      phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

    };

  }

  save() {
    let unmaskedData = {
      phoneNumber: this.phoneNumber.replace(/\D+/g, '')

    };

    console.log(unmaskedData);
  }


 doBack() {
    this.navCtrl.pop();
  }
}