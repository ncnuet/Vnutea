import { IUser } from "./auth";
import { Response as _Response, Request as _Request } from "express"

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