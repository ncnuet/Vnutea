import { model } from "mongoose";
import { IMessageSchema, MessageSchema } from "@/models/schema/message.schema";

export default model<IMessageSchema>("Message", MessageSchema);