import { model } from "mongoose";
import { MongoosasticModel } from "mongoosastic";
import StudentSchema, { IStudentSchema } from "../schema/student.schema";

export const StudentBaseModel = model<IStudentSchema, MongoosasticModel<IStudentSchema>>("Student", StudentSchema)