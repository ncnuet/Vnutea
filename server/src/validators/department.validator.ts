import BaseValidator from "./base.validator";
import { IDepartment } from "@/models/schema/department.schema";

export interface ICreateDepartment extends IDepartment { }

export interface IDeleteDepartment {
    id: string;
}

export default class DepartmentValidator extends BaseValidator {
    static validateCreate(data: ICreateDepartment) {
        this.checkName(data.name);
        this.checkId(data.dean);
        this.checkFile(data.image);
        this.checkContact(data.contact);
        this.checkDetail(data.details);
    }

    static validateDelete(data: IDeleteDepartment) {
        this.checkId(data.id);
    }
}