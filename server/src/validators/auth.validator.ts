import { IUserRole } from "@/types/auth";
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
    role: IUserRole,
    major: string
}
export default class AuthValidator extends BaseValidator {
    private static validateUsername(username: string) {
        if (!username || username.length < 3 || username.length > 50) {
            throw new InputError("Username có độ dài từ 3 đến 50 ký tự", "username");
        }
        return true
    }

    private static validateName(name: string) {
        if (!name || name.length < 3) {
            throw new InputError("Invalid name", "name");
        }
    }

    private static validatePassword(password: string) {
        if (!password || password.length < 8 || password.length > 50) {
            throw new InputError("Mật khẩu có độ dài từ 8 đến 50 ký tự", "password");
        }
        return true
    }

    private validatePhone(phone: string) {
        if (!phone || phone.length !== 10 || !phone.startsWith("0")) {
            throw new InputError("Invalid phone number", "phone");
        }
        return true;
    }

    static validateLogin(data: ILogin) {
        AuthValidator.validateUsername(data.username)
        AuthValidator.validatePassword(data.password)
    }

    static validateCreate(data: ICreateUser) {
        AuthValidator.validateUsername(data.username);
        AuthValidator.validateName(data.name);
        BaseValidator.validateRole(data.role)
    }
}