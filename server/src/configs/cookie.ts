import { CookieOptions } from "express";

export const cookieOption: CookieOptions = {
    httpOnly: true, // Not allowed reading from JS
    secure: true // Not allowed reading from http
}

export function setAge(age: number): CookieOptions {
    return {
        ...cookieOption,
        maxAge: age
    }
}