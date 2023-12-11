import { InputError, Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import cloudinary from "@/configs/cloudinary";
import fileUpload from "express-fileupload";
import userModel from "@/models/user.model";
import { EUserRole } from "@/types/auth";
import DepartmentModel from "@/models/department.model";
import LabValidator, { ICreateLab } from "@/validators/lab.validator";
import LabModel from "@/models/lab.model";

export default class LabController {
    private static async precheck(data: ICreateLab) {
        if (data.dean) {
            const users = await userModel.getUsers([data.dean]);
            if (users.length === 0) throw new InputError("Invalid dean id", "dean");
            if (users[0].role !== EUserRole.TEACHER) throw new InputError("Invalid role of dean", "dean");
        }

        if (data.department) {
            const departments = await DepartmentModel.get([data.department]);
            if (departments.length === 0) throw new InputError("Invalid department id", "department");
        }
    }

    public static async create(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <ICreateLab>req.body;
        const file = req.files

        handleError(res, async () => {
            data.contact = typeof data.contact === "string" ? JSON.parse(data.contact) : data.contact;
            data.details = typeof data.details === "string" ? JSON.parse(data.details) : data.details;

            LabValidator.validateCreate({ ...data, image: file ? "true" : void 0 });
            await LabController.precheck(data);

            const uploadFile = <fileUpload.UploadedFile>file.image;
            const result = await cloudinary.uploader.upload(uploadFile.tempFilePath, {
                public_id: uploadFile.name,
                resource_type: "auto",
                folder: "uploaded",
                use_filename: true,
                unique_filename: false,
            });

            if (result.secure_url) {
                const id = await LabModel.create({
                    image: result.secure_url,
                    dean: data.dean,
                    contact: data.contact,
                    name: data.name,
                    description: data.description,
                    details: data.details,
                    creator: user.uid,
                    department: data.department
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
            LabValidator.validateDelete({ id });
            const ack = await LabModel.delete(id);

            res.status(200).send(
                {
                    message: ack ? "Deleted successfully" : "Unable to delete",
                    data: { id }
                })
        })
    }
}