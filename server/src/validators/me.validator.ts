import BaseValidator from "./base.validator";
import { EFavouriteType, IFavourite } from "@/models/schema/favourite.schema";
import { InputError } from "@/types/controller";

export interface IAddFavourite extends IFavourite { }
export interface IDelFavorite {
    id: string;
}

export default class MeValidator extends BaseValidator {
    private static checkFavouriteType(type: string, und?: boolean) {
        if (type) {
            if (!Object.values(EFavouriteType).includes(type as EFavouriteType))
                throw new InputError("Invalid favourite type", "type");
        } else if (!und) throw new InputError("Must include favorite type", "type")
    }

    static validateAddFavourite(data: IAddFavourite) {
        this.checkId(data.ref);
        this.checkFavouriteType(data.type)
    }
}