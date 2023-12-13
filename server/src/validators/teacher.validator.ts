import { InputError } from "@/types/controller";
import BaseValidator from "./base.validator";
import { ITeacher } from "@/models/schema/teacher.schema";

export interface ICreateTeacher extends Omit<ITeacher, "classes"> { }

export interface IUpdateTeacher
    extends Partial<Omit<ITeacher, "name" | "awards" | "creator" | "user" | "classes">> {
    id: string;
}

export interface IDeleteTeacher {
    id: string;
}

export default class TeacherValidator extends BaseValidator {
    private static checkAwards(awards: string[], und?: boolean) {
        if (awards) {
            if (!Array.isArray(awards))
                throw new InputError("Awards must be an array", "awards");
            awards.forEach((award) => this.checkId(award));

        } else if (!und) throw new InputError("Must include a list of awards", "awards")
    }

    static validateCreate(data: ICreateTeacher) {
        this.checkName(data.name);
        this.checkId(data.user);
        this.checkId(data.lab, true);
        this.checkId(data.department, true);
        this.checkAwards(data.awards, true);
        this.checkContact(data.contact, true)
        this.checkDetail(data.details, true);
        this.checkFile(data.image, true);
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
}