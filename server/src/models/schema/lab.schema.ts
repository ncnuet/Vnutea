import { Schema, ObjectId } from "mongoose";
import { ContactSchema, IContact } from "./contact.schema";
import { DetailSchema, IDetail } from "./detail.schema";

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
    extends Omit<ILab, "dean" | "department" | "creator"> {
    dean: ObjectId;
    creator: ObjectId;
    department: ObjectId;
}

export const LabSchema = new Schema<ILabSchema>({
    name: { type: String, required: true },
    dean: { type: Schema.Types.ObjectId, required: true },
    description: { type: String },
    contact: { type: ContactSchema, required: true },
    details: { type: [DetailSchema], required: true },
    image: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, required: true },
    department: { type: Schema.Types.ObjectId, required: true },
})