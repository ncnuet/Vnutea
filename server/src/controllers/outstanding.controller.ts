import OutstandingModel from "@/models/outstanding.model";
import { Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import OutstandingValidator, { ICreateOutstanding, IUpdateOutstanding } from "@/validators/outstanding.validate";
import cloudinary from "@/configs/cloudinary";
import fileUpload from "express-fileupload";
export default class OutstandingController {
    static async create(req: Request, res: Response) {
        const user = res.locals.user;
        const data = <ICreateOutstanding>req.body;
        const file = req.files

        handleError(res, async () => {
            OutstandingValidator.validateCreate(data);
            const uploadFile = <fileUpload.UploadedFile>file.image;
            const result = await cloudinary.uploader.upload(uploadFile.tempFilePath, {
                public_id: uploadFile.name,
                resource_type: "auto",
                folder: "uploaded",
                use_filename: true,
                unique_filename: false,
            });

            if (result.secure_url) {
                const id = await OutstandingModel.create(result.secure_url, data.ref, data.type, user.uid)
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
            const _id = await OutstandingModel.delete(id);

            if (_id) {
                res.status(200).send({ message: "Success", data: { id } })
            } else {
                res.status(500).send({ message: "Unable to delete", data: { id } })
            }
        })
    }
}