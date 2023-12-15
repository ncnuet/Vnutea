import { CookieOptions } from "express";

export const cookieSecureOption: CookieOptions = {
    httpOnly: true, 
    secure: true
}

export function withAge(age: number | undefined): CookieOptions {
    return {
        ...cookieSecureOption,
        maxAge: age
    }
}