import BaseValidator from "./base.validator";
import { ITeacher } from "@/models/schema/teacher.schema";
import { IAward } from "@/models/schema/award.schema";

export interface ICreateTeacher extends Omit<ITeacher, "classes" | "position"> { }

export interface IUpdateTeacher
    extends Partial<Omit<ITeacher, "name" | "awards" | "creator" | "user" | "classes">> {
    id: string;
}

export interface IDeleteTeacher {
    id: string;
}

export interface IGetByDepartment {
    departments: string[];
}

export default class TeacherValidator extends BaseValidator {
    private static checkAwards(awards: IAward[], und?: boolean) {
        this.checkArray(awards, und, "awards");
    }

    static validateCreate(data: ICreateTeacher) {
        this.checkId(data.user, false, "user");
        this.checkName(data.name);
        this.checkId(data.department, true, "department");
        this.checkId(data.lab, true, "lab");
        this.checkAwards(data.awards, true); //TODO: check
        this.checkContact(data.contact, true)
        this.checkDetail(data.details, true);
        this.checkFile(data.image, true, "image");
    }

    static validateUpdate(data: IUpdateTeacher) {
        this.checkId(data.id);
        this.checkId(data.lab, true);
        this.checkId(data.department, true);
        this.checkContact(data.contact, true)
        this.checkDetail(data.details, true);
        this.checkFile(data.image, true);
    }

    static validateDelete(data: IDeleteTeacher) {
        this.checkId(data.id);
    }

    static validateGetByDepartment(data: IGetByDepartment) {
        this.checkArray(data.departments, false, "departments");
        data.departments.forEach(dep => this.checkId(dep))
    }
}