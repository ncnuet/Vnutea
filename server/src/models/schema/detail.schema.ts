import { Schema } from "mongoose"

export interface IDetailSchema {
    title: string,
    content: string[]
}

export const DetailSchema = new Schema<IDetailSchema>({
    title: { type: String, required: true },
    content: { type: [String], required: true }
})