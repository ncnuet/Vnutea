import { NextFunction } from "express";
import { Request, Response } from "@/types/controller";
import * as jwt from "jsonwebtoken";
import config from "@/configs/env";
import { generateToken } from "@/utils/generate";
import tokenModel from "@/models/token.model";
import { withAge } from "@/configs/cookie";
import handleError from "@/utils/handle_error";
import { IUser } from "@/types/auth";

export async function checkRWT(req: Request, res: Response, next: NextFunction) {
    const refresh = req.cookies.refresh_token;

    handleError(res, async () => {
        if (!refresh || !(await tokenModel.getRefreshToken(refresh))) {
            return res.sendStatus(401);
        }

        try {
            const user = <IUser>jwt.verify(refresh, config.JWT_REFRESH_KEY);
            user.role = await tokenModel.getRole(user.uid);
            user.version = await tokenModel.getVersion(user.uid);
            const token = generateToken(user, true);
            await tokenModel.insertRefreshToken(token.refreshToken, user.uid, user.role)

            res.cookie("refresh_token", token.refreshToken, withAge(86400 * 1000))
                .cookie("token", token.accessToken, withAge(user.remember ? 3600 * 1000 : void 0))
                .locals.user = user;

            next();
        } catch (error) {
            console.log(error);
            res.sendStatus(401);
        }
    })
}