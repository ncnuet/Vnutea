import { CookieOptions } from "express";

export const cookieSecureOption: CookieOptions = {
    httpOnly: true, // Not allowed reading from JS
    secure: true // Not allowed reading from http
}

// Set with fixed age
export function withAge(age: number): CookieOptions {
    if (age === undefined) return withSession();
    return {
        ...cookieSecureOption,
        maxAge: age
    }
}

// Expire when client shutdown: Eg. Close browser,...
export function withSession(): CookieOptions {
    return {
        ...cookieSecureOption,
    }
}