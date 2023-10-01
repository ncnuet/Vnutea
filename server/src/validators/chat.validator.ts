import { UID } from "@/types/auth"

export interface ICreateRoom {
    name?: string
    uids: UID[]
}

export interface IDeleteRoom {
    roomID: string
}

export interface IGetRoomByID {
    roomID: string
}

export interface IUpdateRoom {
    roomID: string
    name?: string
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
}

export default new ChatValidator();