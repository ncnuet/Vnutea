import { model } from "mongoose";
import { IOutstandingSchema, OutstandingSchema } from "../schema/outstanding.schema";
import { MongoosasticModel } from "mongoosastic";

export const OutstandingBaseModel = model<IOutstandingSchema, MongoosasticModel<IOutstandingSchema>>('Outstanding', OutstandingSchema);