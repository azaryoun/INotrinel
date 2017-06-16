import { Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { JWT } from './../models/j-w-t'

export class AppSetting {

    public static DROPDOWN_TEXT = "(Not Selected)";

    public static SERVER_IP = "http://localhost:5070/api/";

    public static AUTH_KEY = "authKey";

    public static getRequestOptions() {
        return new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
    }

    public static handleError(error: Response) {
        // output errors to the console.

        sessionStorage.removeItem(this.AUTH_KEY);
        console.error(error);

        return Observable.throw(error.json().error || 'Server error');
    }

    public static logout(): boolean {
        sessionStorage.removeItem(this.AUTH_KEY);
        return false;
    }

    public static isLoggedIn(): boolean {
        return sessionStorage.getItem(this.AUTH_KEY) != null;
    }

    public static setAuth(jWT: JWT) {

        sessionStorage.removeItem(this.AUTH_KEY);
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(jWT));

    }

    public static getAuth(): JWT {
        let authKey = sessionStorage.getItem(this.AUTH_KEY);
        if (authKey != null && authKey.toString() != "undefined") {
            return JSON.parse(authKey);
        }
        else {
            this.logout();
            return null;
        }
    }

}
