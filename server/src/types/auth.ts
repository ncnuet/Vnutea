export type UID = string;
export type IUserRole = "admin" | "teacher" | "student";

export interface IUser extends IUserWithoutVersion {
    version: string
}

export interface IUser extends IUserWithoutVersion {
    version: string,
    remember: boolean
}

export interface IUserWithoutVersion {
    username: string,
    uid: UID
    role: IUserRole,
}

export type IQueryableUser = {
    username: string,
    uid: UID,
    phone: string,
    email: string
}