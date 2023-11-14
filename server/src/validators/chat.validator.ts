import { MESSAGE_TYPES } from "@/models/schema/message.schema"
import { UID } from "@/types/auth"

export interface ICreateRoom {
    name?: string
    uids: UID[]
}

export interface IDeleteRoom {
    roomID: string
}

export interface IGetRoomByID {
    roomID: string,
    limit?: number
    page?: number
}

export interface IUpdateRoom {
    roomID: string
    name?: string
}

export interface ICreateMessage {
    roomID: string,
    message?: string,
    type: MESSAGE_TYPES
}

export interface IDeleteMessage {
    messageID: string
}

class ChatValidator {
    validateCreateRoom(data: ICreateRoom) {
        if (!data.uids || data.uids.length === 0)
            throw new Error("uids must contain at least one", { cause: "uids" });
    }

    validateDeleteRoom(data: IDeleteRoom) {
        if (!data.roomID)
            throw new Error("roomID must not be empty", { cause: "roomID" });
    }

    validateGetRoom(data: IGetRoomByID) {
        if (!data.roomID)
            throw new Error("roomID must not be empty", { cause: "roomID" });
    }

    validateUpdateRoom(data: IGetRoomByID) {
        if (!data.roomID)
            throw new Error("roomID must not be empty", { cause: "roomID" });
    }

    validateCreateMessage(data: ICreateMessage) {
        if (!data.roomID || !data.type)
            throw new Error("Payload must include roomID and type", { cause: "type" });
        if (!Object.values(MESSAGE_TYPES).includes(data.type))
            throw new Error("Invalid message type", { cause: "type" });
    }

    validateDeleteMessage(data: IDeleteMessage) {
        if (!data.messageID)
            throw new Error("messageID must not be empty", { cause: "messageID" });
    }
}

export default new ChatValidator();