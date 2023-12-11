import { CookieOptions } from "express";

export const cookieSecureOption: CookieOptions = {
    httpOnly: true, // Not allowed reading from JS
    secure: true // Not allowed reading from http
}

export function withAge(age: number | undefined): CookieOptions {
    return {
        ...cookieSecureOption,
        maxAge: age
    }
}