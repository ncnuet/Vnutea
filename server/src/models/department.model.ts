import { ICreateDepartment } from "@/validators/department.validator";
import { DepartmentBaseModel } from "./base/department.base";

export default class DepartmentModel {
    static async create(data: ICreateDepartment) {
        const { name, dean, description, contact, details, image } = data;
        const response = await DepartmentBaseModel.create(
            { name, dean, description, contact, details, image }
        );

        return response._id;
    }

    static async delete(id: string) {
        const result = await DepartmentBaseModel.deleteOne(
            { _id: id }
        ).exec();

        return result.acknowledged;
    }

    static async get() {
        const result = await DepartmentBaseModel.find().exec();
        return result;
    }
}