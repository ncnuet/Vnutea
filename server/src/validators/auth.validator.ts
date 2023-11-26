import { IQueryableUser, IUser, IUserRole } from "@/types/auth";
import { InputError } from "@/types/controller";
import CommonValidator from "./common.validator";

export interface ILogin {
    username: string,
    password: string
    remember?: boolean
}

export interface IRequestReset extends IQueryableUser { }

export interface IResetPassword {
    password: string,
    re_password: string
}

export interface ICreateUser {
    username: string
    name: string,
    role: IUserRole,
    major: string
}
export default class AuthValidator {
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

    private static validateEmail(email: string) {
        if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw new InputError("Email không hợp lệ", "email");
        }
        return true
    }

    private static validateRePassword(password: string, re_password: string) {
        if (re_password != password) {
            throw new InputError("Mật khẩu nhập lại cần giống mật khẩu", "re_password");

        }
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

    static validateRequestReset(data: IRequestReset) {
        data.username && AuthValidator.validateUsername(data.username) ||
            data.uid && CommonValidator.validateUID(data.uid) ||
            AuthValidator.validateEmail(data.email)
    }

    static validateReset(data: IResetPassword) {
        AuthValidator.validatePassword(data.password)
        AuthValidator.validateRePassword(data.password, data.re_password);
    }

    static validateCreate(data: ICreateUser) {
        AuthValidator.validateUsername(data.username);
        AuthValidator.validateName(data.name);
    }
}