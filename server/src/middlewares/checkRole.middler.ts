import { IUserRole } from "@/types/auth";
import { NextFunction, Request, Response } from "@/types/controller";

export default async function checkRole(this: IUserRole, req: Request, res: Response, next: NextFunction) {
    const ref_role = this ? this : "admin";

    if (res.locals.user.role === ref_role) next();
    else res.sendStatus(401);
}