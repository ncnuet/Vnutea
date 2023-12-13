import { EvaluationBaseModel } from "./base/evaluation.base";
import { ICreateEvaluation, IUpdateEvaluation } from "@/validators/evaluation.validator";

export default class EvaluationModel {
    static async create(data: ICreateEvaluation) {
        const { creator, classID, criteria } = data;

        const response = await EvaluationBaseModel.create(
            { creator, classID, criteria }
        );

        return response._id;
    }

    static async delete(id: string, creator: string) {
        const result = await EvaluationBaseModel.deleteOne(
            { _id: id, creator: creator }
        ).exec();

        return result.acknowledged;
    }

    static async update(id: string, creator: string, data: IUpdateEvaluation) {
        const { criteria } = data;

        const response = await EvaluationBaseModel.updateOne(
            { id: id, creator: creator },
            { criteria: criteria })

        return response.acknowledged;
    }

    static async get(ids: string[]) {
        const result = await EvaluationBaseModel.find({ _id: { $in: ids } }).exec();
        return result;
    }
}