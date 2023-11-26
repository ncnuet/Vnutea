import { InputError } from "@/types/controller";

export interface ICreateOutstanding {
    image: string;
    ref: string;
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
        throw new InputError("Ref must be provided", "ref");
    }

    static validateCreate(data: ICreateOutstanding) {
        OutstandingValidator.validateImage(data.image);
        OutstandingValidator.validateRef(data.ref);
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