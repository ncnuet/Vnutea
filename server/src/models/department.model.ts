import { ICreateDepartment } from "@/validators/department.validator";
import { DepartmentBaseModel } from "./base/department.base";

export default class DepartmentModel {
    static async create(data: ICreateDepartment) {
        const { name, dean, description, contact, details, image, creator } = data;
        const response = await DepartmentBaseModel.create(
            { name, dean, description, contact, details, image, creator }
        );

        return response._id;
    }

    static async delete(id: string) {
        const result = await DepartmentBaseModel.deleteOne(
            { _id: id }
        ).exec();

        return result.acknowledged;
    }

    static async search(query: string) {
        const departments = await DepartmentBaseModel.search(
            {
                match: {
                    name: {
                        query: query,
                        fuzziness: "auto",
                        fuzzy_transpositions: true,
                    }
                }
            },
            {
                hydrate: true,
                hydrateOptions: { select: "name _id" }
            })

        return departments.body.hits.hydrated;
    }

    static async get(ids: string[]) {
        const result = await DepartmentBaseModel.find({ _id: { $in: ids } }).exec();
        return result;
    }

    static async getAllName() {
        const result = await DepartmentBaseModel.find().exec();
        
        return result.map(dep => ({
            name: dep.name,
            id: dep._id
        }))
    }
}