import { model } from "mongoose";
import { ILabSchema, LabSchema } from "../schema/lab.schema";

export const LabBaseModel = model<ILabSchema>('Lab', LabSchema);