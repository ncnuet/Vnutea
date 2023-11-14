import { model } from "mongoose";
import { IMessageSchema, MessageSchema } from "@/models/schema/message.schema";

export const MessageBaseModel = model<IMessageSchema>("Message", MessageSchema);