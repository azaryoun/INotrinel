import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonValidator } from './../../validators/common-validator';
import { HomeComponent } from './../home/home-component';
import { AccountService } from './../../providers/account-service';

import { ValidateMobileNoResult } from './../../models/validate-mobile-no-result'

import { ValidateMobileNoStatusEnum } from './../../models/validate-mobile-no-result'

import { JWT } from './../../models/j-w-t';

import { AppSetting } from './../../app/app.setting';

@Component({
  selector: 'login-component',
  templateUrl: 'login-component.html'
})
export class LoginComponent {

  public form: FormGroup;

  public isButtonPressed: boolean = false;


  public masks: any;

  public resultMessage: string;


  constructor(public navCtrl: NavController, fb: FormBuilder, private _accountService: AccountService,
    private _loadingController: LoadingController
  ) {

    this.masks = {
      mobileNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      code: [/\d/,'-', /\d/,'-', /\d/,'-', /\d/,'-', /\d/]
    };


    this.form = fb.group({
      mobileNo: ['', Validators.compose([Validators.required, CommonValidator.mobileNoIsInvalid])]
    })


  }


  // کد فعالسازی در صورت موفقیت فرایند احراز هویت، برای شما پیامک خواهد شد.
  public sendSMS() {


    let strMobileNo = this.form.controls['mobileNo'].value.replace(/\D+/g, '');

    let loader = this._loadingController.create({
      content: " ارتباط با سرویس دهنده ...",
    });


    loader.present();

    this._accountService.validateMobileNo(strMobileNo).subscribe(data => {
      let validateMobileNoResult: ValidateMobileNoResult = data;
      switch (validateMobileNoResult.status) {
        case ValidateMobileNoStatusEnum.isInvalid:
          {
            this.resultMessage = "شماره مویایل شما جز مشترکین نیست";
            break;
          }
        case (ValidateMobileNoStatusEnum.isAlreadyRegistered):
          {
            this.resultMessage = "این شماره موبایل، قبلا فعال شده است";
            break;
          }
        case (ValidateMobileNoStatusEnum.isValid):
          {
            try {
              //  let jwt: JWT = validateMobileNoResult.jwt;
              //   alert(validateMobileNoResult);
              //  console.log(validateMobileNoResult);
              //   AppSetting.setAuth(jwt);
              this.resultMessage = "کد فعال سازی برای موبایل شما پیامک گردید؛ برای ادامه کد دریافت شده را وارد کادر زیر نمایید:";
              break;
            }
            catch (ex) {
              alert(ex);
            }


          }
      }

      this.isButtonPressed = true;
      loader.dismiss();

    }

    );





  }

  public enterSystem() {
    this.navCtrl.setRoot(HomeComponent);
  }
}