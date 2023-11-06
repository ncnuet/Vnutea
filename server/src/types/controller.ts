import { Response as _Response, Request as _Request, NextFunction as _NextFunction } from "express"
import { IUser } from "./auth";

export interface ILocalData<T extends IUser = IUser> {
    user: T
}

export interface IResponseData {
    message: string,
    name?: string,
    data?: any
}

export type Response<T = IResponseData, N = ILocalData> = _Response<T, N>
export type Request = _Request;
export type NextFunction = _NextFunction

export class InputError extends Error {
    field: string;

    constructor(message: string, field: string) {
        super(message);
        Object.setPrototypeOf(this, InputError.prototype);
        this.field = field;
    }
}