import { InputError } from "@/types/controller";
import BaseValidator from "./base.validator";
import { EOutstandingType, IOutstanding } from "@/models/schema/outstanding.schema";

export interface ICreateOutstanding extends IOutstanding { }

export interface IDeleteOutstanding {
    id: string;
}

export default class OutstandingValidator extends BaseValidator {
    private static checkFile(file: string, und?: boolean) {
        if (file) {

        } else if (!und) throw new InputError("Must include a file", "file")
    }

    private static checkOutstandingType(type: string, und?: boolean) {
        if (type) {
            if (!Object.values(EOutstandingType).includes(type as EOutstandingType))
                throw new InputError("Invalid outstanding type", "type");
        } else if (!und) throw new InputError("Must included outstanding type", "type");
    }

    static validateCreate(data: ICreateOutstanding) {
        this.checkFile(data.image);
        this.checkId(data.ref);
        this.checkOutstandingType(data.type);
    }

    static validateDelete(data: IDeleteOutstanding) {
        this.checkId(data.id);
    }
}