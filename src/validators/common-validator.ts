import { FormControl } from '@angular/forms';
import { AppSetting } from './../app/app.setting';

export class CommonValidator {

    static cannotContainSpace(formControl: FormControl) {
        if (formControl.value.indexOf(' ') >= 0)
            return { cannotContainSpace: true };
        return null;
    }

    static cannotselectedNotSelected(formControl: FormControl) {
        if (formControl.value === AppSetting.DROPDOWN_TEXT)
            return { cannotselectedNotSelected: true };
        return null;
    }


    static mobileNoIsInvalid(formControl: FormControl) {
        let strMobileNo = formControl.value.replace(/\D+/g, '');
        //alert(strMobileNo.length);
        if (strMobileNo.length != 10)
            return { mobileNoIsInvalid: true };
        return null;
    }

}