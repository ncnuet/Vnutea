import { InputError } from "@/types/controller";

export interface ICreateOutstanding {
    image: string;
    ref: string;
    type: string;
}

export interface IDeleteOutstanding {
    id: string;
}

export interface IUpdateOutstanding {
    id: string;
    ref: string;
    image: string;
}

export default class OutstandingValidator {
    private static validateID(id: string) {
        if (!id) {
            throw new InputError("ID must be provided", "id");
        }
    }

    private static validateImage(image: string) {
        if (!image) {
            throw new InputError("Image must be provided", "image");
        }
    }

    private static validateRef(ref: string) {
        if (!ref) {
            throw new InputError("Ref must be provided", "ref");
        }
        if (ref.length != 24) {
            throw new InputError("Invalid ref", "ref");
        }
    }

    private static validateType(type: string) {
        if (!type) {
            throw new InputError("Type must be provided", "type");
        }
        if (!["teacher", "department", "lab"].includes(type)) {
            throw new InputError("Invalid type", "type");
        }
    }

    static validateCreate(data: ICreateOutstanding) {
        OutstandingValidator.validateImage(data.image);
        OutstandingValidator.validateRef(data.ref);
        OutstandingValidator.validateType(data.type);
    }

    static validateDelete(data: IDeleteOutstanding) {
        OutstandingValidator.validateID(data.id);
    }

    static validateUpdate(data: IUpdateOutstanding) {
        OutstandingValidator.validateID(data.id);
        OutstandingValidator.validateImage(data.image);
        OutstandingValidator.validateRef(data.ref);
    }
}