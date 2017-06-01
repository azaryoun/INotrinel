export class ValidateMobileNoResult {
    constructor(public userId: string, public status: ValidateMobileNoStatusEnum)
    { }
}

export enum ValidateMobileNoStatusEnum {
    isValid = 1,
    isAlreadyRegistered = 2,
    isInvalid = 3
}