import { JWT } from './j-w-t';



export class ActivateAccountResult {
    constructor(
        public firstName: string,
        public lastName: string,
        public username: string,
        public mobileNo: string,
        public status: ActivateAccountResultStatusEnum,
        public jwt: JWT,

    ) {
        status = ActivateAccountResultStatusEnum.isUserInvalid;
        jwt = null;
    }
}

export enum ActivateAccountResultStatusEnum {
    isCodeValid = 1,
    isUserInvalid = 2,
    isRegisterationInvalid = 3,
    isCodeInvalid = 4,
}

