import { ICreateStudent, IUpdateStudent } from "@/validators/student.validator";
import { StudentBaseModel } from "./base/student.base";

export default class StudentModel {
    static async create(data: ICreateStudent) {
        const {
            name, user, department, creator
        } = data;

        const response = await StudentBaseModel.create(
            {
                name, user, department, creator,
                classes: []
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

    static async addClass(ids: string[], classID: string) {
        const response = await StudentBaseModel.updateMany(
            { user: { $in: ids } },
            {
                $push: {
                    classes: classID
                }
            })

        return response.acknowledged;
    }

    static async deleteClass(ids: string[], classID: string) {
        const response = await StudentBaseModel.updateMany(
            { user: { $in: ids } },
            {
                $pull: {
                    classes: classID
                }
            })

        return response.acknowledged;
    }
}