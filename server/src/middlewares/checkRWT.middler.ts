import { NextFunction, CookieOptions } from "express";
import { Request, Response } from "@/types/controller";
import * as jwt from "jsonwebtoken";
import config from "@/configs/env.config";
import { IUser } from "@/types/auth";
import authModel from "@/models/auth.model";
import { generate_token } from "@/utils/generate";

export async function checkRWT(req: Request, res: Response, next: NextFunction) {
    const refresh = req.cookies.refresh_token;

    try {
        // if the refresh token is not in database...
        if (!refresh || !(await authModel.checkRefreshToken(refresh))) {
            return res.sendStatus(401);
        }

        try {
            // Check valid token 
            const user = <IUser>jwt.verify(refresh, config.JWT_REFRESH_KEY);
            // Update newest user's role
            user.role = await authModel.findRole(user.uid);

            const token = await generate_token(user, true)
            const cookieOption: CookieOptions = {
                httpOnly: true, // Not allowed reading from JS
                secure: true // Not allowed reading from http
            }

            res.cookie("refresh_token", token.refreshToken, { maxAge: 86400 * 1000, ...cookieOption })
                .cookie("token", token.accessToken, { maxAge: 3600 * 1000, ...cookieOption })
                .locals.user = user;
            next();

        } catch (error) {
            console.log(error);
            res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}