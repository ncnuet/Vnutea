import { InputError } from "@/types/controller";
import BaseValidator from "./base.validator";
import { IUser } from "@/models/schema/user.schema";

export interface ILogin {
    username: string,
    password: string
    remember?: boolean
}

export interface ICreateUser extends Pick<IUser, "username" | "role" | "name"> { }

export interface IDeleteUser {
    id: string
}

export default class UserValidator extends BaseValidator {
    private static checkUsername(username: string, und?: boolean) {
        if (username) {
            if (username.length < 3 || username.length > 50) {
                throw new InputError("Username có độ dài từ 3 đến 50 ký tự", "username");
            }
        } else if (!und) throw new InputError("Must include username", "username");
    }

    static validateCreate(data: ICreateUser) {
        this.checkName(data.name);
        this.checkUsername(data.username);
        this.checkRole(data.role)
    }

    static validateDelete(data: IDeleteUser) {
        this.checkId(data.id);
    }
}