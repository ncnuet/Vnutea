import { Document, ObjectId, Schema } from "mongoose";
import { ContactSchema, IContact } from "./contact.schema";
import { DetailSchema, IDetail } from "./detail.schema";
import mongoosastic, { MongoosasticDocument } from "mongoosastic";
import { LabBaseModel } from "../base/lab.base";
import { DepartmentBaseModel } from "../base/department.base";

export interface ITeacher {
    user: string;
    department?: string;
    lab?: string;
    name: string;
    description?: string;
    awards?: string[];
    contact?: IContact,
    details?: IDetail[],
    image?: string,
    creator: string,

}

export interface ITeacherSchema
    extends Omit<ITeacher, | "department" | "lab" | "awards" | "creator" | "user">, Document, MongoosasticDocument {
    department?: ObjectId;
    lab?: ObjectId;
    awards: ObjectId[];
    creator: ObjectId;
    user: ObjectId;
}

const TeacherSchema = new Schema<ITeacherSchema>({
    department: { type: Schema.Types.ObjectId, ref: DepartmentBaseModel },
    lab: { type: Schema.Types.ObjectId, ref: LabBaseModel },
    name: { type: String, required: true, es_indexed: true },
    description: { type: String },
    awards: { type: [Schema.Types.ObjectId] },
    contact: { type: ContactSchema },
    details: { type: [DetailSchema] },
    image: { type: String },
    creator: { type: Schema.Types.ObjectId, required: true },
    user: { type: Schema.Types.ObjectId, required: true }
})

// @ts-ignore
TeacherSchema.plugin(mongoosastic)

export { TeacherSchema };