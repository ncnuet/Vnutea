import { ILab } from "@/models/schema/lab.schema";
import BaseValidator from "./base.validator";

export interface ICreateLab extends ILab { }

export interface IDeleteLab {
    id: string;
}

export default class LabValidator extends BaseValidator {
    static validateCreate(data: ICreateLab) {
        this.checkName(data.name);
        this.checkId(data.dean);
        this.checkFile(data.image);
        this.checkContact(data.contact);
        this.checkDetail(data.details);
        this.checkId(data.department);
    }

    static validateDelete(data: IDeleteLab) {
        this.checkId(data.id);
    }
}