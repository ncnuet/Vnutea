import { ICreateOutstanding } from "@/validators/outstanding.validate";
import { OutstandingBaseModel } from "./base/outstanding.base";

export default class OutstandingModel {
    static async create(data: ICreateOutstanding) {
        const { creator, image, ref, type } = data;
        const response = await OutstandingBaseModel.create(
            { creator, image, ref, type }
        );

        return response._id;
    }

    static async delete(id: string) {
        const result = await OutstandingBaseModel.deleteOne(
            { _id: id }
        ).exec();

        return result.acknowledged;
    }

    static async get() {
        const result = await OutstandingBaseModel.find().exec();
        return result;
    }
}