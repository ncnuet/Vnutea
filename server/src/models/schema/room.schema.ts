import { UID } from "@/types/auth";
import mongoose from "mongoose";

export interface IChatRoom {
    uids: Array<UID>
    name: string
    initiator: UID
}

const chatRoomSchema = new mongoose.Schema<IChatRoom>({
    uids: [{
        type: String,
        required: true
    }],
    initiator: {
        type: String,
        required: true
    },
    name: String
}, {
    timestamps: true,
    collection: "chatrooms",
});

export default mongoose.model("ChatRoom", chatRoomSchema);