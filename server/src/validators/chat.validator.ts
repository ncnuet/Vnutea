import { EMessageType, IMessage } from "@/models/schema/message.schema"
import BaseValidator from "./base.validator";

export interface ICreateRoom {
    name?: string
    participants: string[]
}

export interface IDeleteRoom {
    roomID: string
}

export interface IGetRoomByID {
    roomID: string,
    // limit?: number
    // page?: number
}

export interface IUpdateRoom {
    roomID: string
    name?: string
}

export interface ICreateMessage extends Omit<IMessage, "seenBy" | "creator"> { }

// export interface IDeleteMessage {
//     messageID: string
// }

export class ChatValidator extends BaseValidator {
    static validateCreateRoom(data: ICreateRoom) {
        this.checkArray(data.participants, false, "participants");
    }

    static validateDeleteRoom(data: IDeleteRoom) {
        this.checkId(data.roomID, false, "roomID")
    }

    static validateGetRoom(data: IGetRoomByID) {
        this.checkId(data.roomID, false, "roomID")
    }

    static validateUpdateRoom(data: IGetRoomByID) {
        this.checkId(data.roomID, false, "roomID")
    }

    static validateCreateMessage(data: ICreateMessage) {
        this.checkId(data.roomID, false, "roomID")
        this.checkTypeEnum(EMessageType, data.type, true, "type", "message type");
    }

    // validateDeleteMessage(data: IDeleteMessage) {
    //     if (!data.messageID)
    //         throw new Error("messageID must not be empty", { cause: "messageID" });
    // }
}