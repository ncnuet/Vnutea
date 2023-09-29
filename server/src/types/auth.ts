export type UID = string | undefined;
export type IUserRole = "teacher" | "member"

export interface IUser {
    username: string,
    uid: string
    role: IUserRole,
    version: string
}

