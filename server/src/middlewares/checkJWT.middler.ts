import { Request, Response, NextFunction, MySocket } from "@/types/controller";
import * as jwt from "jsonwebtoken";
import config from "@/configs/env";
import { checkRWT } from "./checkRWT.middler";
import TokenModel from "@/models/token.model";
import { IUser } from "@/types/auth";

interface ICheckJWT {
    tokenOn?: "query" | "cookie"
}

export async function checkJWT(this: ICheckJWT | void, req: Request, res: Response, next: NextFunction) {
    const token = this && this.tokenOn === "query"
        ? <string>req.query.token
        : <string>req.cookies.token;

    if (!token) return res.sendStatus(401);

    try {
        const user = <IUser>jwt.verify(token, config.JWT_KEY);
        const version = await TokenModel.getVersion(user.uid);

        if (version && version !== user.version) return res.sendStatus(401);
        res.locals.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            checkRWT(req, res, next);
        } else {
            console.log(error);
            return res.sendStatus(401);
        }
    }
}

export function checkJWTForIO(socket: MySocket, next: any) {
    const token = <string>socket.handshake.query.token;
    if (!token) next(new Error("Unauthorized access token"))

    try {
        const user = <IUser>jwt.verify(token, config.JWT_CHAT);
        socket.user = user;
        next()
    } catch (error) {
        next(new Error("Unauthorized access token"));
    }
}