export type IUserRole = "admin" | "teacher" | "student";
export enum EUserRole {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student"
}

export interface IUser extends IUserWithoutVersion {
    version: string,
    remember: boolean
}

export interface IUserWithoutVersion {
    username: string,
    uid: string
    role: IUserRole,
}

export type IQueryableUser = {
    username: string,
    uid: string,
    email: string
}