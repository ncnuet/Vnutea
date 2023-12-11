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
export default class AuthValidator extends BaseValidator {
    private static checkUsername(username: string, und?: boolean) {
        if (username){
            if (username.length < 3 || username.length > 50) {
                throw new InputError("Username có độ dài từ 3 đến 50 ký tự", "username");
            }
        } else if (!und) throw new InputError("Must include username", "username");
    }

    private static checkName(name: string, und?: boolean){
        if (name){
            if (!name || name.length < 5) {
                throw new InputError("Invalid name", "name");
            }
        } else if (!und) throw new InputError("Must include name", "name");
    }

    private static checkPassword(password: string) {
        if (!password || password.length < 8 || password.length > 50) {
            throw new InputError("Mật khẩu có độ dài từ 8 đến 50 ký tự", "password");
        }
    }

    static validateLogin(data: ILogin) {
        AuthValidator.checkUsername(data.username)
        AuthValidator.checkPassword(data.password)
    }

    static validateCreate(data: ICreateUser) {
        AuthValidator.checkUsername(data.username);
        AuthValidator.checkName(data.name);
        this.checkRole(data.role)
        this.checkMajor(data.major);
    }
}