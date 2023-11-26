import { OutstandingBaseModel } from "./base/outstanding.base";

export default class OutstandingModel {
    static async create(image: string, ref: string, initiator: string) {
        const result = await OutstandingBaseModel.create(
            { image, ref, initiator }
        );

        return result._id;
    }

    static async update(id: string, image: string, ref: string, initiator: string) {
        const result = await OutstandingBaseModel.updateOne(
            { _id: id },
            { image, ref, initiator }
        ).exec();

        return result.acknowledged;
    }

    static async delete(id: string) {
        const result = await OutstandingBaseModel.deleteOne(
            { _id: id }
        ).exec();

        return result.acknowledged;
    }
}