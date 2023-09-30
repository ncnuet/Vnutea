import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "@/configs/env.config";
import { IUser } from "@/types/auth";
import { checkRWT } from "./checkRWT.middler";
import { ILocalData } from "@/types/controller";
import tokenModel from "@/models/token.model";

interface ICheckJWT {
    tokenOn?: "param" | "cookie"
}

export async function checkJWT(this: ICheckJWT | void, req: Request, res: Response<any, ILocalData>, next: NextFunction) {
    const token = this && this.tokenOn === "param"
        ? req.query.token
        : req.cookies.token;

    if (!token) return res.sendStatus(401);

    //Try to validate the token and get data
    try {
        const userData = <IUser>jwt.verify(token, config.JWT_KEY);
        const version = await tokenModel.getVersion(userData.uid);

        console.log(userData, version, userData.version);
        if (version && version !== userData.version) return res.sendStatus(401);

        // if valid, pass resolve data to local response and continue processing.
        res.locals.user = userData;
        next();
    } catch (error) {
        checkRWT(req, res, next);
    }
}