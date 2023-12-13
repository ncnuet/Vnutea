import { EvaluationBaseModel } from "./base/evaluation.base";
import { ICreateEvaluation, IUpdateEvaluation } from "@/validators/evaluation.validator";

export default class EvaluationModel {
    static async create(participants: string[], data: ICreateEvaluation) {
        const { creator, classID } = data;

        const response = await EvaluationBaseModel.insertMany(
            participants.map(student => ({
                classID, creator,
                participant: student,
                criteria: [],
                isDone: false,
                isOpen: false
            })))

        return response.map(res => res._id);
    }

    static async delete(participants: string[], classID: string) {
        const result = await EvaluationBaseModel.deleteMany(
            {
                participant: { $in: participants },
                classID: classID
            },
        ).exec();

        return result.acknowledged;
    }

    static async update(data: IUpdateEvaluation) {
        const { criteria, classID, participant } = data;
        
        const response = await EvaluationBaseModel.updateOne(
            { classID: classID, participant: participant },
            {
                criteria: criteria,
                isDone: true
            }
        )

        return response.acknowledged;
    }

    // static async get(ids: string[]) {
    //     const result = await EvaluationBaseModel.find({ _id: { $in: ids } }).exec();
    //     return result;
    // }
}