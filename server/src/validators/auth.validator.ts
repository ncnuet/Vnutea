import { EUserRole } from "@/types/auth";
import { InputError } from "@/types/controller";
import BaseValidator from "./base.validator";

export interface ILogin {
    username: string,
    password: string
    remember?: boolean
}

export interface ICreateUser {
    username: string
    name: string,
    role: EUserRole,
    major: string
}

export interface IDeleteUser {
    id: string
}
export default class AuthValidator extends BaseValidator {
    private static checkUsername(username: string, und?: boolean) {
        if (username){
            if (username.length < 3 || username.length > 50) {
                throw new InputError("Username có độ dài từ 3 đến 50 ký tự", "username");
            }
        } else if (!und) throw new InputError("Must include username", "username");
    }

    private static checkPassword(password: string) {
        if (!password || password.length < 8 || password.length > 50) {
            throw new InputError("Mật khẩu có độ dài từ 8 đến 50 ký tự", "password");
        }
    }

    static validateLogin(data: ILogin) {
        this.checkUsername(data.username)
        this.checkPassword(data.password)
    }

    static validateCreate(data: ICreateUser) {
        this.checkUsername(data.username);
        this.checkName(data.name);
        this.checkRole(data.role)
        this.checkId(data.major);
    }

    static validateDelete(data: IDeleteUser) {
        this.checkId(data.id);
    }
}