import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "@/configs/env.config";
import { IUser } from "@/types/auth";
import { checkRWT } from "./checkRWT.middler";
import { ILocalData } from "@/types/controller";

interface ICheckJWT {
    tokenOn?: "param" | "cookie"
}

export function checkJWT(this: ICheckJWT | void, req: Request, res: Response<any, ILocalData>, next: NextFunction) {
    const token = this && this.tokenOn === "param"
        ? req.query.token
        : req.cookies.token;

    if (!token) return res.sendStatus(401);

    //Try to validate the token and get data
    let userData;
    try {
        userData = <IUser>jwt.verify(token, config.JWT_KEY);
        console.log(userData);

        // TODO: Check token version in redis. But not implemented in this app.
        // userData.version !== user.version -> invalid token

        // if valid, pass resolve data to local response and continue processing.
        res.locals.user = userData;
        next();
    } catch (error) {
        checkRWT(req, res, next);
    }
}