import { ICreateClass } from "@/validators/class.validator";
import { ClassBaseModel } from "./base/class.base";
import { ICreateComment, IDeleteComment } from "@/validators/comment.validator";

export default class ClassModel {
    static async create(data: ICreateClass) {
        const {
            creator, description, name,
            students, teacher, classID
        } = data;

        const response = await ClassBaseModel.create(
            {
                creator, description, name,
                students, teacher, classID,
                rating: 4.8,
                comments: []
            }
        );

        return response._id.toString();
    }

    static async delete(id: string) {
        const result = await ClassBaseModel.deleteOne(
            { _id: id }
        ).exec();

        return result.acknowledged;
    }

    static async search(query: string) {
        const departments = await ClassBaseModel.search(
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
        const result = await ClassBaseModel.find({ _id: { $in: ids } }).exec();
        return result;
    }

    static async addComment(id: string, data: ICreateComment) {
        const response = await ClassBaseModel.updateOne(
            { _id: id },
            {
                $push: {
                    comments: {
                        creator: data.creator,
                        content: data.content
                    }
                }
            })

        return response.acknowledged;
    }

    static async deleteComment(id: string, data: IDeleteComment) {
        const response = await ClassBaseModel.updateOne(
            { _id: id },
            {
                $pull: {
                    comments: {
                        _id: data.cid,
                        creator: data.creator
                    }
                }
            })

        return response.acknowledged;
    }
}