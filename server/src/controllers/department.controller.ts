import { InputError, Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import cloudinary from "@/configs/cloudinary";
import fileUpload from "express-fileupload";
import DepartmentValidator, { ICreateDepartment } from "@/validators/department.validator";
import userModel from "@/models/user.model";
import { EUserRole } from "@/types/auth";
import DepartmentModel from "@/models/department.model";

export default class DepartmentController {
    private static async precheck(data: ICreateDepartment) {
        if (data.dean) {
            const users = await userModel.getUsers([data.dean]);
            if (users.length === 0) throw new InputError("Invalid dean id", "dean");
            if (users[0].role !== EUserRole.TEACHER) throw new InputError("Invalid role of dean", "dean");
        }
    }

    public static async create(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <ICreateDepartment>req.body;
        const file = req.files

        handleError(res, async () => {
            data.contact = typeof data.contact === "string" ? JSON.parse(data.contact) : data.contact;
            data.details = typeof data.details === "string" ? JSON.parse(data.details) : data.details;

            DepartmentValidator.validateCreate({ ...data, image: file ? "true" : void 0 });
            await DepartmentController.precheck(data);

            const uploadFile = <fileUpload.UploadedFile>file.image;
            const result = await cloudinary.uploader.upload(uploadFile.tempFilePath, {
                public_id: uploadFile.name,
                resource_type: "auto",
                folder: "uploaded",
                use_filename: true,
                unique_filename: false,
            });

            if (result.secure_url) {
                const id = await DepartmentModel.create({
                    image: result.secure_url,
                    dean: data.dean,
                    contact: data.contact,
                    name: data.name,
                    description: data.description,
                    details: data.details,
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
            DepartmentValidator.validateDelete({ id });
            const ack = await DepartmentModel.delete(id);

            res.status(200).send(
                {
                    message: ack ? "Deleted successfully" : "Unable to delete",
                    data: { id }
                })
        })
    }

    static async getAllDepartmentsName(req: Request, res: Response) {
        handleError(res, async () => {
            const departments = await DepartmentModel.getAllName();

            res.status(200).json({
                message: "success",
                data: {
                    departments
                }
            })
        })
    }
}