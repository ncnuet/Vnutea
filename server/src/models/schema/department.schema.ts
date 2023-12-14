import { Schema, ObjectId, Document } from "mongoose";
import { ContactSchema, IContact } from "./contact.schema";
import { DetailSchema, IDetail } from "./detail.schema";
import mongoosastic, { MongoosasticDocument } from "mongoosastic";

export interface IDepartment {
    name: string;
    dean: string;
    description: string;
    contact: IContact,
    details: IDetail[],
    image: string
    creator: string
}

export interface IDepartmentSchema
    extends Omit<IDepartment, "dean" | "creator">, Document, MongoosasticDocument {
    dean: ObjectId;
    creator: ObjectId
}

 const DepartmentSchema = new Schema<IDepartmentSchema>({
    name: { type: String, required: true, es_index: true },
    dean: { type: Schema.Types.ObjectId, required: true },
    description: { type: String },
    contact: { type: ContactSchema, required: true },
    details: { type: [DetailSchema], required: true },
    image: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, required: true },
})

// @ts-ignore
DepartmentSchema.plugin(mongoosastic);

export { DepartmentSchema }