import OutstandingModel from "@/models/outstanding.model";
import { InputError, Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import OutstandingValidator, { ICreateOutstanding } from "@/validators/outstanding.validate";
import cloudinary from "@/configs/cloudinary";
import fileUpload from "express-fileupload";
import { EOutstandingType } from "@/models/schema/outstanding.schema";
import UserModel from "@/models/user.model";
import { EUserRole } from "@/types/auth";
import DepartmentModel from "@/models/department.model";
import LabModel from "@/models/lab.model";
import TeacherModel from "@/models/teacher.model";
export default class OutstandingController {
    private static async precheck(data: ICreateOutstanding) {
        switch (data.type) {
            case EOutstandingType.TEACHER:
                const teacher = await UserModel.getUsers([data.ref]);
                if (teacher.length === 0) throw new InputError("Invalid ref id", "ref")
                if (teacher[0].role !== EUserRole.TEACHER) throw new InputError("Invalid role ref", "ref")
                break;
            case EOutstandingType.DEPARTMENT:
                const departments = await DepartmentModel.get([data.ref]);
                if (departments.length === 0) throw new InputError("Invalid ref id", "ref")
                break;
            case EOutstandingType.LAB:
                const labs = await LabModel.get([data.ref]);
                if (labs.length === 0) throw new InputError("Invalid ref id", "ref")
                break;
            default:
        }
    }

    public static async create(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <ICreateOutstanding>req.body;
        const file = req.files

        handleError(res, async () => {
            OutstandingValidator.validateCreate({ ...data, image: file ? "true" : void 0 });
            await OutstandingController.precheck(data);

            const uploadFile = <fileUpload.UploadedFile>file.image;
            const result = await cloudinary.uploader.upload(uploadFile.tempFilePath, {
                public_id: uploadFile.name,
                resource_type: "auto",
                folder: "uploaded",
                use_filename: true,
                unique_filename: false,
            });

            if (result.secure_url) {
                const id = await OutstandingModel.create({
                    image: result.secure_url,
                    ref: data.ref,
                    type: data.type,
                    creator: user.uid
                })
                res.status(200).send({ message: "Success", data: { id } })
            } else {
                res.status(500).send({ message: "Unable to upload image" })
            }
        })
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id;

        handleError(res, async () => {
            OutstandingValidator.validateDelete({ id });
            const ack = await OutstandingModel.delete(id);

            res.status(200).send(
                {
                    message: ack ? "Deleted successfully" : "Unable to delete",
                    data: { id }
                })
        })
    }

    static async getAll(req: Request, res: Response) {
        handleError(res, async () => {
            const outstanding = await OutstandingModel.getAll();
            const teacherIDs = outstanding.map(out => out.ref.toString());
            const teachers = await TeacherModel.get(teacherIDs);

            res.status(200).json({
                message: "success",
                data: {
                    outstanding: teachers
                }
            })
        })
    }
}