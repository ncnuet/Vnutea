import { model } from "mongoose";
import OutstandingSchema, { IOutstandingSchema } from "../schema/outstanding.schema";
import { MongoosasticModel } from "mongoosastic";

export const OutstandingBaseModel = model<IOutstandingSchema, MongoosasticModel<IOutstandingSchema>>('Outstanding', OutstandingSchema);