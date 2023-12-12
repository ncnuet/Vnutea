import { ICreateTeacher, IUpdateTeacher } from "@/validators/teacher.validator";
import { TeacherBaseModel } from "./base/teacher.base";

export default class TeacherModel {
    static async create(data: ICreateTeacher) {
        const {
            name, lab, department, description, awards,
            details, contact, image, creator, user
        } = data;

        const response = await TeacherBaseModel.create(
            {
                name, lab, department, description, awards,
                details, contact, image, creator, user
            }
        );

        return response._id.toString();
    }

    static async delete(id: string) {
        const result = await TeacherBaseModel.deleteOne(
            { user: id }
        ).exec();

        return result.acknowledged;
    }

    static async update(id: string, data: IUpdateTeacher) {
        const {
            department, lab, description, details, contact, image
        } = data;

        const response = await TeacherBaseModel.updateOne({
            user: id
        }, {
            department, lab, description, details, contact, image
        })

        return response.acknowledged;
    }

    static async get(ids: string[]) {
        const result = await TeacherBaseModel.find({ _id: { $in: ids } }).exec();
        return result;
    }
}