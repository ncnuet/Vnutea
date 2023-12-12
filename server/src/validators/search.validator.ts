import BaseValidator from "./base.validator";

export interface ISearch {
    query: string;
}

export default class Search extends BaseValidator {
    static validateSearch(data: ISearch) {
        this.checkName(data.query);
    }
}