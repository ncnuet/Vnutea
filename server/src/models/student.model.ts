import { ICreateStudent, IUpdateStudent } from "@/validators/student.validator";
import { StudentBaseModel } from "./base/student.base";

export default class StudentModel {
    static async create(data: ICreateStudent) {
        const {
            name, user, department, creator
        } = data;

        const response = await StudentBaseModel.create(
            {
                name, user, department, creator
            }
        );

        return response._id.toString();
    }

    static async delete(id: string) {
        const result = await StudentBaseModel.deleteOne(
            { user: id }
        ).exec();

        return result.acknowledged;
    }

    static async update(id: string, data: IUpdateStudent) {
        const {
            name, user, department
        } = data;

        const response = await StudentBaseModel.updateOne({
            user: id
        }, {
            name, user, department
        })

        return response.acknowledged;
    }

    static async get(ids: string[]) {
        const result = await StudentBaseModel.find({ user: { $in: ids } }).exec();
        return result;
    }
}