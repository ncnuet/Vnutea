export type UID = string | undefined;
export type IUserRole = "teacher" | "member"

export interface IUser extends IUserWithoutVersion{
    version: string
}

export interface IUserWithoutVersion {
    username: string,
    uid: string
    role: IUserRole,
}

