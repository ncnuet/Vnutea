import { MESSAGE_TYPES } from "@/models/schema/message.schema"
import { UID } from "@/types/auth"
import { InputError } from "@/types/controller";
import CommonValidator from "./common.validator";

export interface ICreateRoom {
    name?: string
    participants: Array<UID>
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

export interface ICreateMessage {
    roomID: string,
    message?: string,
    type: MESSAGE_TYPES
}

// export interface IDeleteMessage {
//     messageID: string
// }

class ChatValidator {
    private validateRoomID(roomID: string) {
        if (!roomID) {
            throw new InputError("Must provide roomID", "participants");
        }
        return true;
    }

    validateCreateRoom(data: ICreateRoom) {
        if (!data.participants) {
            throw new InputError("Must provide participants", "participants");
        } else if (!Array.isArray(data.participants)) {
            throw new InputError("Participants must be an array", "participants");
        } else {
            data.participants.map(uid => CommonValidator.validateUID(uid))
        }
    }

    validateDeleteRoom(data: IDeleteRoom) {
        this.validateRoomID(data.roomID)
    }

    validateGetRoom(data: IGetRoomByID) {
        this.validateRoomID(data.roomID)
    }

    validateUpdateRoom(data: IGetRoomByID) {
        this.validateRoomID(data.roomID)
    }

    validateCreateMessage(data: ICreateMessage) {
        this.validateRoomID(data.roomID)
        if (!Object.values(MESSAGE_TYPES).includes(data.type))
            throw new Error("Invalid message type", { cause: "type" });
    }

    // validateDeleteMessage(data: IDeleteMessage) {
    //     if (!data.messageID)
    //         throw new Error("messageID must not be empty", { cause: "messageID" });
    // }
}

export default new ChatValidator();