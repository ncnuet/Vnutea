import { model } from "mongoose";
import { ITeacherSchema, TeacherSchema } from "../schema/teacher.schema";

export const TeacherBaseModel = model<ITeacherSchema>("Teacher", TeacherSchema)