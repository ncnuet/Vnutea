export enum EUSerRole {
    STUDENT = "student",
    ADMIN = "admin",
    TEACHER = "teacher"
}

export interface IUser {
    uid: string,
    name: string,
    role: EUSerRole,
    username: string
}


export interface IContact {
    phones: string[],
    emails: string[],
    social: string[]
}

export interface IInfo {
    title: string,
    content: string[]
}

export interface IDepartmentName {
    name: string;
    id: string;
}

export interface IDepartmentDetails extends IDepartmentName {
    contact: IContact,
    image: string
}

export interface ITeacher {
    name: string;
    id: string;
    awards: {
        name: string;
        color: string;
    }[],
    liked: boolean;
    image: string;
    department: IDepartmentName;
}

export interface ITeacherDetails extends ITeacher {
    description: string;
    contact: IContact,
    details: IInfo[]
}

export interface IOutstanding {
    data: ITeacher | IDepartmentDetails
    type: "department" | "teacher"
}