import { model } from "mongoose";
import { DepartmentSchema, IDepartmentSchema } from "../schema/department.schema";

export const DepartmentBaseModel = model<IDepartmentSchema>('department', DepartmentSchema);