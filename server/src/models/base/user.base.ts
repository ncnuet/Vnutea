import { model } from "mongoose";
import { IUserSchema, UserSchema } from "@/models/schema/user.schema";

export const UserBaseModel = model<IUserSchema>('User', UserSchema);