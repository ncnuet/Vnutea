import { NextFunction } from "express";
import { Request, Response } from "@/types/controller";
import * as jwt from "jsonwebtoken";
import config from "@/configs/env.config";
import { IUser } from "@/types/auth";
import { generate_token } from "@/utils/generate";
import tokenModel from "@/models/token.model";
import { setAge } from "@/configs/cookie";
import handleError from "@/utils/handle_error";

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
            const token = await generate_token(user, true);
            await tokenModel.insertRefreshToken(token.refreshToken, user.uid, user.role)

            res.cookie("refresh_token", token.refreshToken, setAge(86400 * 1000))
                .cookie("token", token.accessToken, setAge(3600 * 1000))
                .locals.user = user;

            next();
        } catch (error) {
            console.log(error);
            res.sendStatus(401);
        }
    })
}