
import { Injectable } from '@angular/core';

import { Response } from "@angular/http";

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { Http2Service } from "./http2-service";

import { AppSetting } from './../app/app.setting';


@Injectable()
export class NewsService {
    data: any = null;

    private _serviceUrl = 'assets/data/data1.json';

    constructor(private _http: Http2Service) {
        this._serviceUrl = AppSetting.SERVER_IP + this._serviceUrl;

    }

    public load() {

        let strUrl = this._serviceUrl;
        return this._http.get(strUrl,
            AppSetting.getRequestOptions())
            .map(response => response.json());

    }

    getFilteredParks(queryString) {
        return this.load().map(Parks => {
            let theFilteredParks: any = [];
            for (let thePark of Parks) {
                if (thePark.name.toLowerCase().indexOf(queryString.toLowerCase()) > -1) {
                    theFilteredParks.push(thePark);
                }
            }
            return theFilteredParks;
        });
    }



}
