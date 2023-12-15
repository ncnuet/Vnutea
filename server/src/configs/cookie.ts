import { CookieOptions } from "express";

export const cookieSecureOption: CookieOptions = {
    httpOnly: false, 
    secure: false
}

export function withAge(age: number | undefined): CookieOptions {
    return {
        ...cookieSecureOption,
        maxAge: age
    }
}