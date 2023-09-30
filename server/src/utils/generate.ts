import * as jwt from "jsonwebtoken";
import config from "@/configs/env.config";
import { JWTOpt, JWTRefreshOpt } from "@/configs/jwt";
import { IUser } from "@/types/auth";

interface IUserPayload extends IUser {
    iat: number
    exp: number
}

function generateMinMax(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Generates numeric id with the specified length
 * @param length 
 * @returns 
 */
export function generate_uid(length: number = 8): string {
    return [...new Array(length)].map(() => generateMinMax(0, 9).toString()).join("");
}

/**
 * Generates token and refresh token
 * @param user 
 * @param gen_RT 
 * @returns 
 */
export async function generate_token(user: IUserPayload | IUser, gen_RT?: boolean) {
    const { iat, exp, ...data } = user as IUserPayload;
    const accessToken = jwt.sign(data, config.JWT_KEY, JWTOpt);

    const refreshToken = (gen_RT)
        ? jwt.sign(data, config.JWT_REFRESH_KEY, JWTRefreshOpt)
        : undefined

    return { accessToken, refreshToken }
}

/**
 * Generates password
 * @param length 
 * @returns 
 */
export function generate_password(length: number = 8): string {
    length = (length > 0) ? length : 8;
    const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

    return [...new Array(length)].map(() => base[generateMinMax(0, base.length - 1)]).join("");
}