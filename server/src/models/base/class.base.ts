import { model } from "mongoose";
import { MongoosasticModel } from "mongoosastic";
import { ClassSchema, IClassSchema } from "../schema/class.schema";

export const ClassBaseModel = model<IClassSchema, MongoosasticModel<IClassSchema>>('Class', ClassSchema);