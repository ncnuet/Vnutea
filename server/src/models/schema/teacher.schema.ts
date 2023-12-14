import { Document, ObjectId, Schema } from "mongoose";
import { ContactSchema, IContact } from "./contact.schema";
import { DetailSchema, IDetail } from "./detail.schema";
import mongoosastic, { MongoosasticDocument } from "mongoosastic";
import { LabBaseModel } from "../base/lab.base";
import { DepartmentBaseModel } from "../base/department.base";
import { AwardSchema, IAward } from "./award.schema";

export interface ITeacher {
    user: string;
    department?: string;
    lab?: string;
    name: string;
    description?: string;
    awards?: IAward[];
    contact?: IContact,
    details?: IDetail[],
    image?: string,
    creator: string,
    classes: [string],
    position: [string]
}

export interface ITeacherSchema
    extends Omit<ITeacher, | "department" | "lab" | "creator" | "user" | "classes">, Document, MongoosasticDocument {
    department?: ObjectId;
    lab?: ObjectId;
    creator: ObjectId;
    user: ObjectId;
    classes: ObjectId[];
}

const TeacherSchema = new Schema<ITeacherSchema>({
    department: { type: Schema.Types.ObjectId, ref: DepartmentBaseModel },
    lab: { type: Schema.Types.ObjectId, ref: LabBaseModel },
    name: { type: String, required: true, es_indexed: true },
    description: { type: String },
    awards: { type: [AwardSchema] },
    contact: { type: ContactSchema },
    details: { type: [DetailSchema] },
    image: { type: String },
    creator: { type: Schema.Types.ObjectId, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    classes: { type: [Schema.Types.ObjectId], required: true },
    position: { type: [String], required: true }
})

// @ts-ignore
TeacherSchema.plugin(mongoosastic)

export { TeacherSchema };