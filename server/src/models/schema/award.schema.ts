import { Schema } from "mongoose";

export interface IAwardSchema {
    name: string;
    year: number;
    description: string;
    th_time: number;
}

export const AwardSchema = new Schema<IAwardSchema>({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String },
    th_time: { type: Number, required: true }
})