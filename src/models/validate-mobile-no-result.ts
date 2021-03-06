

export class ValidateMobileNoResult {
    constructor(public userId: string, public status: ValidateMobileNoStatusEnum) {
        status = ValidateMobileNoStatusEnum.isInvalid;
    }
}

export enum ValidateMobileNoStatusEnum {
    isValid = 1,
    isAlreadyRegistered = 2,
    isInvalid = 3
}