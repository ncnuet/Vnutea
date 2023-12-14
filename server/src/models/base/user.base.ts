import { model } from "mongoose";
import UserSchema, { IUserSchema } from "@/models/schema/user.schema";

export const UserBaseModel = model<IUserSchema>('User', UserSchema);