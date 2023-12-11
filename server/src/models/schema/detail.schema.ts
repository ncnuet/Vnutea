import { Schema } from "mongoose"

export interface IDetail {
    title: string,
    content: string[]
}
export interface IDetailSchema extends IDetail {}

export const DetailSchema = new Schema<IDetailSchema>({
    title: { type: String, required: true },
    content: { type: [String], required: true }
})