import { InputError, Request, Response } from "@/types/controller";
import handleError from "@/utils/handle_error";
import cloudinary from "@/configs/cloudinary";
import fileUpload from "express-fileupload";
import LabModel from "@/models/lab.model";
import TeacherModel from "@/models/teacher.model";
import TeacherValidator, { ICreateTeacher, IGetByDepartment, IUpdateTeacher } from "@/validators/teacher.validator";
import UserModel from "@/models/user.model";
import DepartmentModel from "@/models/department.model";

export default class TeacherController {
    private static async precheck(data: ICreateTeacher | IUpdateTeacher) {
        // TODO: check awards

        if (data.lab) {
            const labs = await LabModel.get([data.lab]);
            if (labs.length === 0) throw new InputError("Invalid ref id", "ref")
        }
    }

    static async update(req: Request, res: Response) {
        const id = req.params.id;
        const data = <IUpdateTeacher>req.body;
        const file = req.files;

        handleError(res, async () => {
            data.contact = typeof data.contact === "string" ? JSON.parse(data.contact) : data.contact;
            data.details = typeof data.details === "string" ? JSON.parse(data.details) : data.details;

            TeacherValidator.validateUpdate({ ...data, id, image: file ? "true" : void 0 });
            await TeacherController.precheck(data);

            const uploadFile = <fileUpload.UploadedFile>file.image;
            const result = await cloudinary.uploader.upload(uploadFile.tempFilePath, {
                public_id: uploadFile.name,
                resource_type: "auto",
                folder: "uploaded",
                use_filename: true,
                unique_filename: false,
            });

            if (result.secure_url) {
                const ack = await TeacherModel.update(id, data);
                res.status(200).send(
                    {
                        message: ack ? "Deleted successfully" : "Unable to delete",
                        data: { id }
                    })
            } else {
                res.status(200).send({ message: "Unable to upload image" })
            }
        });
    }

    static async getAll(req: Request, res: Response) {
        const user = res.locals.user;

        handleError(res, async () => {
            const [teacher, favorites] = await Promise.all([
                TeacherModel.getAll(),
                UserModel.getFavorites(user.uid)
            ]);

            const departments = await DepartmentModel.getName(teacher.map(item => item.department))

            res.status(200).json({
                message: "success",
                data: {
                    teacher: teacher.map(teacher => ({
                        ...teacher,
                        department: departments.find(dep => dep.id === teacher.department),
                        liked: favorites.some(fa => fa.ref === teacher.id)
                    }))
                }
            })
        })
    }

    static async getDetails(req: Request, res: Response) {
        const user = res.locals.user;
        const teacherID = req.params.id;

        handleError(res, async () => {
            const teacher = await TeacherModel.getDetails(teacherID as string)

            const [departments, favorites] = await Promise.all([
                await DepartmentModel.getName([teacher.department]),
                await UserModel.getFavorites(user.uid)
            ])

            res.status(200).json({
                message: "success",
                data: {
                    teacher: {
                        ...teacher,
                        department: departments.find(dep => dep.id === teacher.department),
                        liked: favorites.some(fa => fa.ref === teacher.id)
                    }
                }
            })
        })
    }
}