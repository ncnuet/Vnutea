import { ILocalData, Request, Response } from "@/types/controller"
import { withAge, withSession } from '@/configs/cookie';
import { generateResetToken, generateToken } from '@/utils/generate';
import handleError from '@/utils/handle_error';
import AuthValidator, { ICreateUser, ILogin, IRequestReset, IResetPassword } from "@/validators/auth.validator";
import authModel from '@/models/auth.model';
import tokenModel from "@/models/token.model";
import { sendForgetPasswordMail } from "@/utils/send_mail";
import env from "@/configs/env";
import { IUser } from "@/types/auth";

interface IUserWithEpx extends IUser {
    exp: number;
}

function setToken(res: Response, remember: boolean, accessToken: string, refreshToken?: string) {
    refreshToken && res.cookie("refresh_token", refreshToken, withAge(86400 * 1000))
    res
        .status(200)
        .cookie("token", accessToken, withAge(remember ? 3600 * 1000 : void 0))
        .json({ message: "success", data: { accessToken, refreshToken } })
        .send();
}

export default class AuthController {
    /**
     * Verify account, return access token and refresh token if true.
     * @param req 
     * @param res 
     */
    static async login(req: Request, res: Response) {
        const data = <ILogin>req.body;
        console.log(data);

        await handleError(res, async () => {
            AuthValidator.validateLogin(data);
            const user = await authModel.findUserByPassword(data.username, data.password);

            if (user) {
                const version = (await tokenModel.getVersion(user.uid)) || "0";
                const token = generateToken({ ...user, version, remember: data.remember }, true);
                await tokenModel.insertRefreshToken(token.refreshToken, user.uid, user.role)
                setToken(res, data.remember, token.accessToken, token.refreshToken);
            } else {
                res.status(401).json({
                    message: "Invalid username or password",
                    name: "password"
                });
            }
        })
    }

    /**
     * Logout
     * @param req 
     * @param res 
     */
    static async logout(req: Request, res: Response) {
        const user = res.locals.user;

        await handleError(res, async () => {
            tokenModel.deleteRefreshToken(user.uid);
            tokenModel.updateVersion(user.uid);
            res.cookie("token", null, withAge(0));
            res.cookie("refresh_token", null, withAge(0));
            res.sendStatus(200);
        });
    }

    /**
     * Request reset password
     * @param req 
     * @param res 
     */
    static async requestReset(req: Request, res: Response) {
        const data = <IRequestReset>req.body;
        console.log(data);

        await handleError(res, async () => {
            AuthValidator.validateRequestReset(data);
            const user = await authModel.findUserByInfo(data);
            if (user) {
                const { username, uid } = user;
                const token = generateResetToken({
                    username, uid,
                    role: "admin",
                    version: "0",
                    remember: false
                });

                await sendForgetPasswordMail(user, token);

                res.status(200).json({ message: "Email đã được gửi thành công tới " + user.email });
            } else {
                res.status(400).json({
                    message: "Không tồn tại email",
                    name: "email"
                })
            }
        })
    }

    /**
     * Verify link and redirect to front-end 
     * @param req 
     * @param res 
     */
    static async verifyReset(req: Request, res: Response<any, ILocalData<IUserWithEpx>>) {
        const username = res.locals.user.username;
        const timeExp = res.locals.user.exp * 1000;
        const remaining = Math.floor((timeExp - new Date().getTime()) / 1000);

        res
            .cookie("token", req.query.token, withAge(180 * 1000))
            .redirect(env.FRONTEND + "/resetpassword?ttl=" + remaining + "&user=" + username)
    }

    static async resetPassword(req: Request, res: Response) {
        const data = <IResetPassword>req.body;

        await handleError(res, async () => {
            AuthValidator.validateReset(data);
            const user = <IUser>res.locals.user;

            await authModel.updatePassword(user.uid, data.password)
            res.json({ message: "Password changed successfully" });
        })
    }

    static async create(req: Request, res: Response) {
        const data = <ICreateUser>req.body;
        const user = res.locals.user;

        handleError(res, async () => {
            AuthValidator.validateCreate(data);

            await authModel.createUser(
                data.username,
                data.name,
                user.uid,
                data.major,
                data.role
            );
            res.json({message: "User created successfully"},)
        })
    }
}