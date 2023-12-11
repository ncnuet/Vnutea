import { RoomBaseModel } from "./base/room.base";
import mongoose from "mongoose";
var ObjectId = mongoose.Types.ObjectId;
class RoomModel {
    async findByParticipants(participants: string[]) {
        const result = await RoomBaseModel.findOne(
            {
                participants: {
                    $size: participants.length,
                    $all: [...participants],
                },
            })
            .exec();

        return result ? result : undefined;
    }

    async createRoom(initiator: string, participants: string[], name: string) {
        participants.push(initiator)

        const room = await RoomBaseModel.create({
            name, initiator, participants,
            room_type: (participants.length > 2) ? "group" : "P2P"
        })

        return room;
    }

    async deleteRoom(roomID: string, initiator: string) {
        const result = await RoomBaseModel.deleteOne({ _id: roomID, initiator }).exec();
        return result.deletedCount > 0 ? roomID : false;
    }

    async getRoom(roomID: string, uid: string) {
        const room = await RoomBaseModel.findOne(
            {
                _id: roomID,
                participants: {
                    $elemMatch: {
                        $eq: new ObjectId(uid)
                    }
                }
            })
            .exec()

        return room;
    }

    async getRoomHasUser(uid: string) {
        const rooms = await RoomBaseModel.find(
            {
                participants: {
                    $elemMatch: {
                        $eq: new ObjectId(uid)
                    }
                }
            })
            .exec()

        return rooms;
    }

    // async getAllRooms(uid: UID): Promise<IGetRoomResult[]> {
    //     const rooms = await roomSchema.find<IGetRoomResult>({ uids: { $in: [uid] } });

    //     return rooms;
    // }

    async updateRoom(roomID: string, uid: string, name?: string) {
        const result = await RoomBaseModel.updateOne(
            {
                _id: roomID,
                participants: {
                    $elemMatch: {
                        $eq: new ObjectId(uid)
                    }
                }
            },
            { name })
            .exec();

        return result.modifiedCount > 0 ? roomID : false;
    }
}

export default new RoomModel();