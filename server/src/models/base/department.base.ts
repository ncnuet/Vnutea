import { model } from "mongoose";
import { DepartmentSchema, IDepartmentSchema } from "../schema/department.schema";
import { MongoosasticModel } from "mongoosastic";

export const DepartmentBaseModel = model<IDepartmentSchema, MongoosasticModel<IDepartmentSchema>>('Department', DepartmentSchema);