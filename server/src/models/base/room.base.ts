import { model } from "mongoose";
import { IRoomSchema, RoomSchema } from "../schema/room.schema";

export const RoomBaseModel =  model<IRoomSchema>("ChatRoom", RoomSchema);