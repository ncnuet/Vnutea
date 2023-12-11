import { Request, Response, NextFunction } from "@/types/controller";
import * as jwt from "jsonwebtoken";
import config from "@/configs/env";
import { IUser } from "@/types/auth";

export function checkReset(req: Request, res: Response, next: NextFunction) {
    const token = <string>req.query.token || <string>req.cookies.token;
    if (!token) return res.sendStatus(401);

    try {
        const user = <IUser>jwt.verify(token, config.JWT_RESET_KEY);

        res.locals.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(401);
    }
}