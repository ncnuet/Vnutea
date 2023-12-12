import { InputError } from "@/types/controller";
import BaseValidator from "./base.validator";
import { IClass } from "@/models/schema/class.schema";

export interface ICreateClass extends Omit<IClass, "rating" | "comments"> { }

export interface IDeleteClass {
    id: string;
}

export default class ClassValidator extends BaseValidator {
    private static checkStudent(students: string[], und?: boolean) {
        if (students) {
            if (!Array.isArray(students)) throw new InputError("students must be an array", "students");
            students.forEach(student => this.checkId(student));
        } else if (!und) throw new InputError("Must include students list", "students")
    }

    private static checkClassID(classID: string, und?: boolean) {
        if (classID) {
            // TODO check class ID
        } else if (!und) throw new InputError("Must include class ID", "classID");
    }

    static validateCreate(data: ICreateClass) {
        this.checkName(data.name);
        this.checkId(data.teacher);
        this.checkClassID(data.classID);
        this.checkStudent(data.students)
    }

    static validateDelete(data: IDeleteClass) {
        this.checkId(data.id);
    }

}