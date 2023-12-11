import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { DepartmentBaseModel } from "../base/department.base";
import { ContactSchema, IContactSchema } from "./contact.schema";
import { DetailSchema, IDetailSchema } from "./detail.schema";
import mongoosastic, { MongoosasticDocument } from "mongoosastic";
var ObjectId = mongoose.Types.ObjectId;

export interface ITeacherSchema extends Document, MongoosasticDocument {
    department: ObjectId;
    fullname: String;
    description: String;
    awards: ObjectId[];
    contacts: IContactSchema,
    details: IDetailSchema[]
}

export const TeacherSchema = new Schema<ITeacherSchema>({
    department: { type: ObjectId, ref: DepartmentBaseModel, required: true },
    fullname: { type: String, required: true },
    description: { type: String },
    awards: { type: [ObjectId] },
    contacts: { type: ContactSchema, required: true },
    details: { type: [DetailSchema], required: true }
})

// @ts-ignore
TeacherSchema.plugin(mongoosastic)