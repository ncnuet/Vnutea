import { ICreateLab } from "@/validators/lab.validator";
import { LabBaseModel } from "./base/lab.base";

export default class LabModel {
    static async create(data: ICreateLab) {
        const {
            name, dean, description, contact,
            details, image, creator, department
        } = data;

        const response = await LabBaseModel.create(
            {
                name, dean, description, contact,
                details, image, creator, department
            }
        );

        return response._id;
    }

    static async delete(id: string) {
        const result = await LabBaseModel.deleteOne(
            { _id: id }
        ).exec();

        return result.acknowledged;
    }

    static async search(query: string) {
        const departments = await LabBaseModel.search(
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

        return departments.body.hits.hydrated.map(item => ({
            id: item._id.toString(),
            name: item.name
        }));
    }

    static async get(ids: string[]) {
        const result = await LabBaseModel.find({ _id: { $in: ids } }).exec();
        return result;
    }

    static async getAll(labIDs?: string[]) {
        const result = await LabBaseModel.find(
            labIDs
                ? { _id: { $in: labIDs } }
                : {},
            { name: 1, _id: 1, image: 1 }
        ).exec();
        return result.map(item => ({
            name: item.name,
            id: item._id.toString(),
            image: item.image
        }));
    }
}