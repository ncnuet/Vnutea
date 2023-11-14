import { ObjectId, Schema } from "mongoose";
import { ISeenSchema, SeenSchema } from "./seen.schema";
import { UserBaseModel } from "@/models/base/user.base";
var ObjectId = Schema.Types.ObjectId;

export enum MESSAGE_TYPES {
    TEXT = "text",
    IMAGE = "image",
    DELETED = "deleted",
}

interface PaginationOption {
    page?: number,
    limit?: number
}

export interface IMessageSchema {
    message: string
    type: MESSAGE_TYPES,
    createdBy: ObjectId,
    seenBy: ISeenSchema[],
}

export const MessageSchema = new Schema<IMessageSchema>({
    message: { type: String, require: true },
    type: {
        type: String,
        default: () => MESSAGE_TYPES.TEXT,
    },
    createdBy: {
        type: ObjectId,
        required: true,
        ref: UserBaseModel
    },
    seenBy: [SeenSchema],
}, {
    timestamps: true,
});