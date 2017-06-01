
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppSetting } from './../app/app.setting'
import { JWT } from './../models/j-w-t';

@Injectable()
export class Http2Service {

    constructor(private _http: Http) {

    }

    public get(url, opts = AppSetting.getRequestOptions()) {
        this.configureAuth(opts);
        return this._http.get(url, opts).map(
        
            response => {
                try {
                    let strAccessToken = response.headers.get("Authorization");
                    let oJWT = new JWT(strAccessToken);
                    AppSetting.setAuth(oJWT);
                }
                catch (ex) {
                    AppSetting.logout();
                }
                return response;
            }
        )
            .catch(AppSetting.handleError);
    }

    public post(url, data, opts = AppSetting.getRequestOptions()) {

        this.configureAuth(opts);


        return this._http.post(url, data, opts).map(
            response => {
                try {
                    let strAccessToken = response.headers.get("Authorization");
                    let oJWT = new JWT(strAccessToken);
                    AppSetting.setAuth(oJWT);
                }
                catch (ex) {
                    AppSetting.logout();
                }
                return response;
            }
        )
            .catch(AppSetting.handleError)


    }

    public put(url, data, opts = AppSetting.getRequestOptions()) {
        this.configureAuth(opts);
        return this._http.put(url, data, opts).map(
            response => {
                try {
                    let strAccessToken = response.headers.get("Authorization");
                    let oJWT = new JWT(strAccessToken);
                    AppSetting.setAuth(oJWT);
                }
                catch (ex) {
                    AppSetting.logout();
                }
                return response;
            }
        )
            .catch(AppSetting.handleError);
    }

    public delete(url, opts = AppSetting.getRequestOptions()) {
        this.configureAuth(opts);
        return this._http.delete(url, opts).map(
            response => {
                try {
                    let strAccessToken = response.headers.get("Authorization");
                    let oJWT = new JWT(strAccessToken);
                    AppSetting.setAuth(oJWT);
                }
                catch (ex) {
                    AppSetting.logout();
                }
                return response;
            }
        )
            .catch(AppSetting.handleError);
    }

    private configureAuth(opts: any) {
        let jWT = AppSetting.getAuth();
        if (jWT != null && jWT.accessToken != null) {
            if (opts.headers == null) {
                opts.headers = new Headers();
            }
            opts.headers.set("Authorization", `Bearer${jWT.accessToken}`);
        }
    }
}
