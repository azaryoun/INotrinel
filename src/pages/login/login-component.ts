import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonValidator } from './../../validators/common-validator';
import { HomeComponent } from './../home/home-component';
import { AccountService } from './../../providers/account-service';

import { ValidateMobileNoResult } from './../../models/validate-mobile-no-result'

import { ValidateMobileNoStatusEnum } from './../../models/validate-mobile-no-result'

@Component({
  selector: 'login-component',
  templateUrl: 'login-component.html'
})
export class LoginComponent {

  public form: FormGroup;

  public ButtonPressed: boolean = false;


  public masks: any;

  public errorMessage:string;


  constructor(public navCtrl: NavController, fb: FormBuilder, private _accountService: AccountService) {

    this.masks = {
      phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    };


    this.form = fb.group({
      mobileNo: ['', Validators.compose([Validators.required, CommonValidator.mobileNoIsInvalid])]
    })


  }



  public sendSMS() {
    let strMobileNo = this.form.controls['mobileNo'].value.replace(/\D+/g, '');


    this._accountService.validateMobileNo(strMobileNo).subscribe(data => {
      let validateMobileNoResult: ValidateMobileNoResult = data;
      switch (validateMobileNoResult.status) {
        case ValidateMobileNoStatusEnum.isInvalid:
          {
            alert('شماره مویایل شما جز مشترکین نیست');
            break;
          }
        case (ValidateMobileNoStatusEnum.isAlreadyRegistered):
          {
            alert('این شماره موبایل، قبلا فعال شده است');
            break;


          }
        case (ValidateMobileNoStatusEnum.isValid):
          {
            alert('کد فعال سازی برای شما پیامک گردید');
            break;
          }
      }
    }

    );




    this.ButtonPressed = true;
  }

  public enterSystem() {
    this.navCtrl.setRoot(HomeComponent);
  }
}