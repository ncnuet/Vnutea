import DepartmentModel from "@/models/department.model";
import LabModel from "@/models/lab.model";
import { EFavouriteType } from "@/models/schema/favourite.schema";
import TeacherModel from "@/models/teacher.model";
import UserModel from "@/models/user.model";
import { InputError, Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import MeValidator, { IAddFavourite } from "@/validators/me.validator";


export default class MeController {
    private static async checkValidFavouriteRef(data: IAddFavourite) {
        switch (data.type) {
            case EFavouriteType.TEACHER:
                const teachers = await TeacherModel.get([data.ref]);
                if (teachers.length === 0) throw new InputError("Invalid ref id", "ref");
                break;
            case EFavouriteType.DEPARTMENT:
                const departments = await DepartmentModel.get([data.ref]);
                if (departments.length === 0) throw new InputError("Invalid ref id", "ref");
                break;
            case EFavouriteType.LAB:
                const labs = await LabModel.get([data.ref]);
                if (labs.length === 0) throw new InputError("Invalid ref id", "ref");
                break;
        }
    }

    public static async getProfile(req: Request, res: Response) {
        const user = res.locals.user;

        handleError(res, async () => {
            res.status(200).json({
                message: "successfully",
                data: {
                    role: user.role,
                    username: user.username,
                    name: user.name
                }
            })
        })
    }

    public static async addFavorite(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <IAddFavourite>req.body;

        handleError(res, async () => {
            console.log(data);
            
            MeValidator.validateAddFavourite(data);
            await MeController.checkValidFavouriteRef(data);

            const ack = UserModel.addFavorite(user.uid, data);
            res.json({ message: ack ? "Added successfully" : "Unable to add" });
        })
    }

    public static async getFavorite(req: Request, res: Response) {
        const user = res.locals.user;

        handleError(res, async () => {
            const favorites = await UserModel.getFavourites(user.uid);
            res.status(200).json({
                message: "success", data: { favorites }
            })
        })
    }
}