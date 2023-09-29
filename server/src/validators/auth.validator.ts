export interface ILoginByPassword {
    username: string,
    password: string
}

class AuthValidator {
    validateLoginPassword(data: ILoginByPassword) {
        if (!data.username || data.username.length < 3 || data.username.length > 50)
            throw new Error("Username có độ dài từ 3 đến 50 ký tự", { cause: "username" });
        if (!data.password || data.password.length < 8 || data.password.length > 50)
            throw new Error("Mật khẩu có độ dài từ 8 đến 50 ký tự", { cause: "password" });
    }
}

export default new AuthValidator();