import { InputError } from "@/types/controller";
import BaseValidator from "./base.validator";

export interface ILogin {
    username: string,
    password: string
    remember?: boolean
}
export default class AuthValidator extends BaseValidator {
    private static checkUsername(username: string, und?: boolean) {
        if (username) {
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
}