import { IUserRole } from "@/types/auth";
import { NextFunction, Request, Response } from "@/types/controller";

interface ICheckRole {
    role: IUserRole[]
}

export async function checkRole(this: ICheckRole, req: Request, res: Response, next: NextFunction) {
    const { role } = res.locals.user;
    if (!role || !this.role.includes(role)) return res.sendStatus(401);
    next();
}