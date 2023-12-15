import { Document, Schema } from "mongoose";

export interface IAward {
    name: string;
    color: string;
}

export interface IAwardSchema extends IAward, Document { }

export const AwardSchema = new Schema<IAwardSchema>({
    name: { type: String, required: true },
    color: { type: String, required: true }
})