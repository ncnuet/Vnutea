import { InputError, Request, Response } from "@/types/controller"
import { EUserRole } from "@/types/auth";
import { withAge } from '@/configs/cookie';
import { generateToken } from '@/utils/generate';
import handleError from '@/utils/handle_error';

import AuthModel from '@/models/auth.model';
import TokenModel from "@/models/token.model";
import TeacherModel from "@/models/teacher.model";
import StudentModel from "@/models/student.model";
import UserModel from "@/models/user.model";
import DepartmentModel from "@/models/department.model";

import AuthValidator, { ILogin } from "@/validators/auth.validator";
import StudentValidator, { ICreateStudent } from "@/validators/student.validator";
import TeacherValidator, { ICreateTeacher } from "@/validators/teacher.validator";
import UserValidator, { ICreateUser } from "@/validators/user.validator";

type ICreate = ICreateUser & (ICreateStudent | ICreateTeacher);

function setToken(res: Response, remember: boolean, accessToken: string, refreshToken?: string) {
    refreshToken && res.cookie("refresh_token", refreshToken, withAge(86400 * 1000))
    res
        .status(200)
        .cookie("token", accessToken, withAge(remember ? 3600 * 1000 : void 0))
        .json({ message: "success", data: { accessToken, refreshToken } })
        .send();
}

export default class AuthController {
    private static async precheck(data: ICreate) {
        if (data.department) {
            const departments = await DepartmentModel.get([data.department]);
            if (departments.length === 0) throw new InputError("Invalid department id", "department");
        }
    }

    static async login(req: Request, res: Response) {
        const data = <ILogin>req.body;
        console.log(data);

        await handleError(res, async () => {
            AuthValidator.validateLogin(data);
            const user = await AuthModel.findUserByPassword(data.username, data.password);

            if (user) {
                const version = (await TokenModel.getVersion(user.uid)) || "0";
                const token = generateToken({ ...user, version, remember: data.remember }, true);
                await TokenModel.insertRefreshToken(token.refreshToken, user.uid, user.role)
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
            TokenModel.deleteRefreshToken(user.uid);
            TokenModel.updateVersion(user.uid);
            res.cookie("token", null, withAge(0));
            res.cookie("refresh_token", null, withAge(0));
            res.sendStatus(200);
        });
    }

    static async create(req: Request, res: Response) {
        const data = <ICreate>req.body;
        const user = res.locals.user;

        handleError(res, async () => {
            UserValidator.validateCreate(data);
            await AuthController.precheck(data);
            const { creator, name, username, role, department } = { ...data, creator: user.uid };

            const user_id = await UserModel.create({
                name, username, role, creator
            });

            var profile_id = null
            if (data.role === EUserRole.STUDENT) {
                StudentValidator.validateCreate({ ...data, user: user_id } as ICreateStudent);
                profile_id = await StudentModel.create({
                    creator, name, department,
                    user: user_id,
                });
            } else if (data.role === EUserRole.TEACHER) {
                TeacherValidator.validateCreate({ ...data, user: user_id } as ICreateTeacher)
                profile_id = await TeacherModel.create({
                    creator, name, department,
                    user: user_id,
                });
            }

            res.json({
                message: "Created successfully",
                data: {
                    id: user_id,
                    password: "123456789",
                    role: data.role,
                    profile_id
                }
            });
        })
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id;

        handleError(res, async () => {
            UserValidator.validateDelete({ id });

            const ack_user = await UserModel.delete(id);
            const ack_profile = await TeacherModel.delete(id) && await StudentModel.delete(id);

            res.status(200).json({
                message: ack_user && ack_profile ? "Delete successfully" : "Unable to delete",
                data: { id }
            })
        })
    }
}