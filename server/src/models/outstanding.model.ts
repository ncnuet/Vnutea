import { OutstandingBaseModel } from "./base/outstanding.base";

export default class OutstandingModel {
    static async create(image: string, ref: string, type: string, initiator: string) {
        const result = await OutstandingBaseModel.create(
            { image, ref, initiator, type }
        );

        return result._id;
    }

    static async delete(id: string) {
        const result = await OutstandingBaseModel.deleteOne(
            { _id: id }
        ).exec();

        return result.acknowledged ? id : undefined;
    }

    static async get() {
        const result = await OutstandingBaseModel.find().exec();
        return result;
    }
}