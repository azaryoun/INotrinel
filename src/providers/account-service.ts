
import { Injectable } from '@angular/core';

import { Response } from "@angular/http";

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { Http2Service } from "./http2-service";

import { AppSetting } from './../app/app.setting';


@Injectable()
export class AccountService {
    data: any = null;

    private _serviceUrl = 'Account/';

    constructor(private _http: Http2Service) {
        this._serviceUrl = AppSetting.SERVER_IP + this._serviceUrl;

    }

    public validateMobileNo(mobileNo: string) {

        let strUrl = this._serviceUrl + 'validateMobileNo/' + mobileNo;


        return this._http.get(strUrl,
            AppSetting.getRequestOptions())
            .map(response => response.json());

    }


    public activateAccount(userId: string, code: string) {

        let strUrl = this._serviceUrl + 'activateAccount/' + userId;

        alert(code);

        return this._http.put(strUrl, { code: code },
            AppSetting.getRequestOptions())
            .map(response => response.json());

    }

}
