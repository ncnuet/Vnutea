import { sign } from "jsonwebtoken";
import config from "@/configs/env";
import { JWTTokenOpt, JWTRefreshOpt, JWTResetOpt } from "@/configs/jwt";
import { IUser } from "@/types/auth";

interface IUserPayload extends IUser {
    iat?: number
    exp?: number
}

/**
 * Generate a number satisfying [min <= n <= max]
 * @param min 
 * @param max 
 * @returns 
 */
function generateMinMax(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Generate an UID with given length
 * @param length 
 * @returns 
 */
export function generate_uid(length: number = 8): string {
    length = (length > 0) ? length : 8;

    return [...new Array(length)].map(() => generateMinMax(0, 9).toString()).join("");
}

/**
 * Generate token
 * @param data 
 * @param hasRefr true if generate refresh token 
 * @returns 
 */
export function generateToken(user: IUserPayload, gen_RT?: boolean) {
    const { iat, exp, ...data } = user as IUserPayload;

    const accessToken = sign(data, config.JWT_KEY, JWTTokenOpt);
    const refreshToken = gen_RT && sign(data, config.JWT_REFRESH_KEY, JWTRefreshOpt)

    return { accessToken, refreshToken }
}

/**
 * Generate reset token
 * @param data 
 * @returns 
 */
export function generateResetToken(user: IUserPayload) {
    const { iat, exp, ...data } = user as IUserPayload;
    return sign(data, config.JWT_RESET_KEY, JWTResetOpt);
}

// ⚠️
export function generate_password(length: number = 8): string {
    length = (length > 0) ? length : 8;

    const base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const password: string[] = [];

    return [...new Array(length)].map(() => base[generateMinMax(0, base.length - 1)]).join("");
}