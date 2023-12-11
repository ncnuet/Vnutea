import { model } from "mongoose";
import { ITeacherSchema, TeacherSchema } from "../schema/teacher.schema";
import { MongoosasticModel } from "mongoosastic";

export const TeacherBaseModel = model<ITeacherSchema, MongoosasticModel<ITeacherSchema>>("Teacher", TeacherSchema)