import { EMessageType } from "./schema/message.schema";
import { MessageBaseModel } from "./base/message.base";
import { Types } from "mongoose";

export class MessageModel {
    static async createMessage(roomID: string, creator: string, message: string, type: EMessageType = EMessageType.TEXT) {
        const response = await MessageBaseModel.create({
            roomID, message, type, creator
        });

        return response._id;
    }

    static async getConversation(roomID: string) {
        return await MessageBaseModel.aggregate([
            { $match: { roomID: { $eq: new Types.ObjectId(roomID) } } },
            { $sort: { createdAt: -1 } },
        ]).exec();
    }
}