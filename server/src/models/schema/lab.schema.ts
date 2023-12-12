import { Schema, ObjectId, Document } from "mongoose";
import { ContactSchema, IContact } from "./contact.schema";
import { DetailSchema, IDetail } from "./detail.schema";
import mongoosastic, { MongoosasticDocument } from "mongoosastic";

export interface ILab {
    name: string;
    dean: string;
    description: string;
    contact: IContact,
    details: IDetail[],
    department: string,
    image: string
    creator: string
}

export interface ILabSchema
    extends Omit<ILab, "dean" | "department" | "creator">, MongoosasticDocument, Document {
    dean: ObjectId;
    creator: ObjectId;
    department: ObjectId;
}

 const LabSchema = new Schema<ILabSchema>({
    name: { type: String, required: true, es_index: true },
    dean: { type: Schema.Types.ObjectId, required: true },
    description: { type: String },
    contact: { type: ContactSchema, required: true },
    details: { type: [DetailSchema], required: true },
    image: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, required: true },
    department: { type: Schema.Types.ObjectId, required: true },
})

// @ts-ignore
LabSchema.plugin(mongoosastic);

export { LabSchema }