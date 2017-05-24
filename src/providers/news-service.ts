
import { Injectable } from '@angular/core';

import { Response } from "@angular/http";

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { Http2Service } from "./http2-service";

import { AppSetting } from './../app/app.setting';


@Injectable()
export class NewsService {
    data: any = null;

    private _serviceUrl = 'assets/data/news-data.json';

    constructor(private _http: Http2Service) {
        this._serviceUrl = AppSetting.SERVER_IP + this._serviceUrl;

    }

    public getNews() {

        let strUrl = this._serviceUrl;
        return this._http.get(strUrl,
            AppSetting.getRequestOptions())
            .map(response => response.json());

    }

    getNewsFiltered(queryString) {
        return this.getNews().map(news => {
            let theFilteredParks: any = [];
            for (let theNews of news) {
                if (theNews.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1) {
                    theFilteredParks.push(theNews);
                }
            }
            return theFilteredParks;
        });
    }



}
