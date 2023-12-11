import { Request, Response } from "@/types/controller"
import { withAge } from '@/configs/cookie';
import { generateToken } from '@/utils/generate';
import handleError from '@/utils/handle_error';
import AuthValidator, { ICreateUser, ILogin } from "@/validators/auth.validator";
import authModel from '@/models/auth.model';
import tokenModel from "@/models/token.model";
import { EUserRole } from "@/types/auth";

function setToken(res: Response, remember: boolean, accessToken: string, refreshToken?: string) {
    refreshToken && res.cookie("refresh_token", refreshToken, withAge(86400 * 1000))
    res
        .status(200)
        .cookie("token", accessToken, withAge(remember ? 3600 * 1000 : void 0))
        .json({ message: "success", data: { accessToken, refreshToken } })
        .send();
}

export default class AuthController {
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

    static async create(req: Request, res: Response) {
        const data = <ICreateUser>req.body;
        const user = res.locals.user;

        handleError(res, async () => {
            AuthValidator.validateCreate(data);

            // TODO: create profile
            const profile_id: string = data.role === EUserRole.TEACHER
                ? void 0
                : null;

            const user_id = await authModel.create(
                user.uid, profile_id, {
                username: data.username,
                name: data.name,
                role: data.role,
                major: data.major
            });

            res.json({
                message: "Created successfully",
                data: {
                    id: user_id,
                    password: "123456789",
                    role: data.role,
                    teacher_profile: profile_id
                }
            });
        })
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id;

        handleError(res, async () => {
            AuthValidator.validateDelete({ id });

            const user_ok = await authModel.delete(id);
            res.status(200).json({
                message: user_ok ? "Delete successfully" : "Unable to delete",
                data: { id }
            })
        })
    }
}