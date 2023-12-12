import BaseValidator from "./base.validator";
import { IStudent } from "@/models/schema/student.schema";

export interface ICreateStudent extends IStudent { }

export interface IUpdateStudent
    extends Partial<Omit<IStudent, "creator">> {
    id: string;
}

export interface IDeleteStudent {
    id: string;
}

export default class StudentValidator extends BaseValidator {
    static validateCreate(data: ICreateStudent) {
        this.checkId(data.user);
        this.checkId(data.department);
        this.checkName(data.name);
    }

    static validateUpdate(data: IUpdateStudent) {
        
    }

    static validateDelete(data: IDeleteStudent) {
        this.checkId(data.id);
    }
}