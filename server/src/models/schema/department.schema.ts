import { Schema, ObjectId } from "mongoose";
import { ContactSchema, IContact } from "./contact.schema";
import { DetailSchema, IDetail } from "./detail.schema";

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
    extends Omit<IDepartment, "dean" | "creator"> {
    dean: ObjectId;
    creator: ObjectId
}

export const DepartmentSchema = new Schema<IDepartmentSchema>({
    name: { type: String, required: true },
    dean: { type: Schema.Types.ObjectId, required: true },
    description: { type: String },
    contact: { type: ContactSchema, required: true },
    details: { type: [DetailSchema], required: true },
    image: { type: String, required: true }
})