import { Document, Schema } from "mongoose";

export interface IAward {
    name: string;
    year: number;
    description: string;
    th_time: number;
}

export interface IAwardSchema extends IAward, Document { }

export const AwardSchema = new Schema<IAwardSchema>({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String },
    th_time: { type: Number, required: true },

}, {
    timestamps: true
})