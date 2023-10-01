import { UID } from "@/types/auth";
import roomSchema, { IChatRoom } from "./schema/room.schema";

interface ICreateRoomResult {
    isNew: boolean,
    id: string
}

interface IGetRoomResult extends IChatRoom {
    createAt: Date,
    updateAt: Date
}

class RoomModel {
    async createRoom({ initiator, name, uids }: IChatRoom): Promise<ICreateRoomResult> {
        const availableRoom = await roomSchema.findOne({
            uids: {
                $size: uids.length,
                $all: [...uids],
            },
        });

        if (availableRoom) {
            return {
                isNew: false,
                id: availableRoom._id.toString()
            };
        } else {
            const newRoom = await roomSchema.create({ uids, initiator, name });
            return {
                isNew: true,
                id: newRoom._id.toString()
            };
        }
    }

    async deleteRoom(roomID: string, initiator: string): Promise<boolean> {
        const response = await roomSchema.deleteOne({ _id: roomID, initiator })
        return response.deletedCount > 0;
    }

    async getRoom(roomID: string, uid: UID): Promise<IGetRoomResult> {
        const room = await roomSchema.findOne<IGetRoomResult>({ _id: roomID, uids: { $in: [uid] } });

        return room;
    }

    async getAllRooms(uid: UID): Promise<IGetRoomResult[]> {
        const rooms = await roomSchema.find<IGetRoomResult>({ uids: { $in: [uid] } });

        return rooms;
    }

    async updateRoom(roomID: string, uid: UID, name?: string): Promise<boolean> {
        const response = await roomSchema.updateOne({ _id: roomID, uids: { $in: [uid] } }, { name });

        return response.modifiedCount > 0;
    }
}

export default new RoomModel();