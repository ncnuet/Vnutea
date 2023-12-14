import { model } from "mongoose";
import { ILabSchema, LabSchema } from "../schema/lab.schema";
import { MongoosasticModel } from "mongoosastic";

export const LabBaseModel = model<ILabSchema, MongoosasticModel<ILabSchema>>('Lab', LabSchema);