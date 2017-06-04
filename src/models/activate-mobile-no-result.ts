import { JWT } from './j-w-t';

export class ValidateMobileNoResult {
    constructor(public userId: string, public status: ValidateMobileNoStatusEnum, public jwt: JWT) {
        jwt = null;
        status = ValidateMobileNoStatusEnum.isInvalid;
    }
}

export enum ValidateMobileNoStatusEnum {
    isValid = 1,
    isAlreadyRegistered = 2,
    isInvalid = 3
}


