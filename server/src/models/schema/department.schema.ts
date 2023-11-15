import mongoose, { Schema, ObjectId } from "mongoose";
import { ContactSchema, IContactSchema } from "./contact.schema";
import { DetailSchema, IDetailSchema } from "./detail.schema";
var ObjectId = mongoose.Types.ObjectId;

export interface IDepartmentSchema {
    name: string;
    dean: ObjectId;
    description: string;
    contacts: IContactSchema,
    details: IDetailSchema[]
}

export const DepartmentSchema = new Schema<IDepartmentSchema>({
    name: { type: String, required: true },
    dean: { type: ObjectId, required: true },
    description: { type: String },
    contacts: { type: ContactSchema, required: true },
    details: { type: [DetailSchema], required: true }
})