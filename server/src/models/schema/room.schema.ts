import mongoose, { ObjectId } from "mongoose";
var ObjectId = mongoose.Types.ObjectId;

export interface IRoomSchema {
    participants: Array<ObjectId>
    name: string
    initiator: ObjectId
    room_type: "P2P" | "group"
}

export const RoomSchema = new mongoose.Schema<IRoomSchema>({
    participants: [{
        type: ObjectId,
        required: true
    }],
    initiator: {
        type: ObjectId,
        required: true
    },
    name: String,
    room_type: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});