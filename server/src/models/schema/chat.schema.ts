import mongoose from "mongoose";
import { UID } from "@/types/auth";

export enum MESSAGE_TYPES {
    TEXT = "text",
    IMAGE = "image",
    DELETED = "deleted",
}

interface IReadByRecipient {
    uid: UID,
    readAt: Date
}

interface IMessage {
    roomID: string,
    message?: string
    type: MESSAGE_TYPES,
    createdUID: UID,
    readByRecipients: IReadByRecipient[],
}

interface PaginationOption {
    page?: number,
    limit?: number
}

const readByRecipientSchema = new mongoose.Schema<IReadByRecipient>({
    uid: {
        type: String,
        required: true,
    },
    readAt: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: false,
});

const chatMessageSchema = new mongoose.Schema<IMessage>({
    roomID: {
        type: String,
        required: true,
    },
    message: String,
    type: {
        type: String,
        default: () => MESSAGE_TYPES.TEXT,
    },
    createdUID: {
        type: String,
        required: true,
    },
    readByRecipients: [readByRecipientSchema],
}, {
    timestamps: true,
    collection: "chatmessages",
});

export default mongoose.model("ChatMessage", chatMessageSchema);