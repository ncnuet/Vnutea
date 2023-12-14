import { Schema } from "mongoose";

export interface IContact {
    phones: string[];
    emails: string[];
    social: string[];
}

export interface IContactSchema extends IContact {}

export const ContactSchema = new Schema<IContactSchema>({
    phones: { type: [String], required: true },
    emails: { type: [String], required: true },
    social: { type: [String] }
})