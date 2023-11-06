import { IQueryableUser } from "@/types/auth";
import { InputError } from "@/types/controller";

export interface ILoginByPassword {
    username: string,
    password: string
}

export interface IRequestReset extends IQueryableUser { }

export interface IResetPassword {
    password: string,
    re_password: string
}

class AuthValidator {
    private validateUsername(username: string) {
        if (!username || username.length < 3 || username.length > 50)
            throw new InputError("Username có độ dài từ 3 đến 50 ký tự", "username");
        return true
    }

    private validatePassword(password: string) {
        if (!password || password.length < 8 || password.length > 50)
            throw new InputError("Mật khẩu có độ dài từ 8 đến 50 ký tự", "password");
        return true
    }

    private validateEmail(email: string) {
        if (!email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            throw new InputError("Email không hợp lệ", "email");
        }
        return true
    }

    validateLoginPassword(data: ILoginByPassword) {
        this.validateUsername(data.username)
        this.validatePassword(data.password)
    }
}

export default new AuthValidator();