import * as jwt from "jsonwebtoken";
import config from "@/configs/env.config";
import { JWTOpt, JWTRefreshOpt, JWTResetOpt } from "@/configs/jwt";
import AuthModel from "@/models/auth.model";
import { IUser } from "@/types/auth";

interface IUnencryptedData extends IUser { }

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
 * @param data 
 * @param gen_RT 
 * @returns 
 */
export async function generate_token(data: IUnencryptedData, gen_RT?: boolean) {
    const accessToken = jwt.sign(data, config.JWT_KEY, JWTOpt);
    let refreshToken;
    if (gen_RT) {
        refreshToken = jwt.sign(data, config.JWT_REFRESH_KEY, JWTRefreshOpt)
        if (!await AuthModel.insertRefreshToken(refreshToken, data.uid)) {
            throw new Error("Unable to add refresh token");
        }
    }

    return { accessToken, refreshToken }
}

/**
 * 
 * @param data 
 * @returns 
 */
export async function generate_reset_token(data: IUnencryptedData){
    const token = jwt.sign(data, config.JWT_RESET_KEY, JWTResetOpt);
    return token;
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