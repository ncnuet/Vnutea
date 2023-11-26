import { model } from "mongoose";
import { AwardSchema, IAwardSchema } from "../schema/award.schema";

export const AwardBaseModel = model<IAwardSchema>("Award", AwardSchema)