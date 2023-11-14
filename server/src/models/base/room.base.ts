import { model } from "mongoose";
import { IRoomSchema, RoomSchema } from "../schema/room.schema";

export default model<IRoomSchema>("ChatRoom", RoomSchema);