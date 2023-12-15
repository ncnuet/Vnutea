import { Document, ObjectId, Schema } from "mongoose";
import { UserBaseModel } from "@/models/base/user.base";
import { RoomBaseModel } from "../base/room.base";

export enum EMessageType {
    TEXT = "text",
    IMAGE = "image",
    DELETED = "deleted",
}

export interface IMessage {
    message: string,
    roomID: string,
    type: EMessageType,
    creator: string
}

export interface IMessageSchema extends Omit<IMessage, "creator" | "roomID">, Document {
    creator: ObjectId,
    roomID: ObjectId,
}

export const MessageSchema = new Schema<IMessageSchema>({
    message: { type: String, require: true },
    type: { type: String, default: EMessageType.TEXT },
    creator: { type: Schema.Types.ObjectId, required: true, ref: UserBaseModel },
    roomID: { type: Schema.Types.ObjectId, required: true, ref: RoomBaseModel }
}, { timestamps: true });