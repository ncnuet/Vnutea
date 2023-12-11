import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { DepartmentBaseModel } from "../base/department.base";
import { ContactSchema, IContact } from "./contact.schema";
import { DetailSchema, IDetail } from "./detail.schema";
import mongoosastic, { MongoosasticDocument } from "mongoosastic";
import { LabBaseModel } from "../base/lab.base";
var ObjectId = mongoose.Types.ObjectId;

export interface ITeacher {
    department: string;
    lab?: string;
    name: string;
    description: string;
    awards: string[];
    contact: IContact,
    details: IDetail[]
}

export interface ITeacherSchema
    extends Omit<ITeacher, "department" | "lab" | "awards">, Document, MongoosasticDocument {
    department: ObjectId;
    lab?: ObjectId;
    awards: ObjectId[];
}

export const TeacherSchema = new Schema<ITeacherSchema>({
    department: { type: Schema.Types.ObjectId, ref: DepartmentBaseModel, required: true },
    lab: { type: Schema.Types.ObjectId, ref: LabBaseModel },
    name: { type: String, required: true },
    description: { type: String },
    awards: { type: [ObjectId] },
    contact: { type: ContactSchema },
    details: { type: [DetailSchema] }
})

// @ts-ignore
TeacherSchema.plugin(mongoosastic)