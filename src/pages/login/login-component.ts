import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { CommonValidator } from './../../validators/common-validator';
import { TabsPage } from './../tabs/tabs';
import { AccountService } from './../../providers/account-service';

import { ValidateMobileNoResult } from './../../models/validate-mobile-no-result'

import { ValidateMobileNoStatusEnum } from './../../models/validate-mobile-no-result'


import { ActivateAccountResult } from './../../models/activate-mobile-no-result'

import { ActivateAccountResultStatusEnum } from './../../models/activate-mobile-no-result'

import { JWT } from './../../models/j-w-t';

import { AppSetting } from './../../app/app.setting';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'login-component',
  templateUrl: 'login-component.html'
})
export class LoginComponent {

  public form: FormGroup;

  public isButtonPressed: boolean = false;
  public isSMSSent: boolean = false;

  public masks: any;

  public resultMessage: string;

  private _userId: any;

  public isCodeWrong: boolean = false;

  public codeControl = new FormControl();

  constructor(public navCtrl: NavController, fb: FormBuilder, private _accountService: AccountService,
    private _loadingController: LoadingController, private _storage: Storage
  ) {


    this.masks = {
      mobileNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      code: [/\d/, '-', /\d/, '-', /\d/, '-', /\d/, '-', /\d/]
    };



    this.form = fb.group({
      mobileNo: ['', Validators.compose([Validators.required, CommonValidator.mobileNoIsInvalid])]
    });



    this.codeControl.valueChanges
      .filter(text => {
        let code = text.replace(/\D+/g, '');

        this.isCodeWrong = false;

        if (code.length == 5) {

          return true;
        }
        return false;
      })
      .debounceTime(200)
      .subscribe(value => {
        let code = value.replace(/\D+/g, '');
        let loader = _loadingController.create({
          content: " ارتباط با سرویس دهنده ...",
          dismissOnPageChange: false,
        });

        let userId = this._userId;
        loader.present();


        this._accountService.activateAccount(userId, code).subscribe(data => {
          loader.dismiss();
          let ativateAccountResult: ActivateAccountResult;
          ativateAccountResult = data;
          if (ativateAccountResult.status == ActivateAccountResultStatusEnum.isCodeValid) {
            let jwt: JWT = ativateAccountResult.jwt;
            AppSetting.setAuth(jwt);
            this._storage.set('userId', userId);


            this.enterSystem();
          }
          else {
            this.isCodeWrong = true;
          }

        });



      });





    _storage.get('userId').then((val) => {
      if (val != null) {
        this.enterSystem();
      }


    });

  }



  public sendSMS() {
    this.isSMSSent = false;

    let strMobileNo = this.form.controls['mobileNo'].value.replace(/\D+/g, '');

    let loader = this._loadingController.create({
      content: " ارتباط با سرویس دهنده ...",
      dismissOnPageChange: true,
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
              this._userId = validateMobileNoResult.userId;
              this.resultMessage = "کد فعال سازی برای موبایل شما پیامک گردید؛ برای ادامه کد دریافت شده را وارد کادر زیر نمایید:";
              this.isSMSSent = true;
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


  private enterSystem() {
    this.navCtrl.setRoot(TabsPage);
  }
}