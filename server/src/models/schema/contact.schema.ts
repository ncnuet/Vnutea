import { Schema } from "mongoose";

export interface IContactSchema {
    phones: String[];
    emails: String[];
    websites: String[];
}

export const ContactSchema = new Schema<IContactSchema>({
    phones: { type: [String], required: true },
    emails: { type: [String], required: true },
    websites: { type: [String] }
})