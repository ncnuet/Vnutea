import { Schema, ObjectId, Document } from "mongoose";

export enum EFavouriteType {
    TEACHER = "teacher",
    LAB = "lab",
    DEPARTMENT = "department",
}

export interface IFavourite {
    type: EFavouriteType,
    ref: string,
    name: string
}

export interface IFavouriteSchema
    extends Omit<IFavourite, "ref">, Document {
    ref: ObjectId;
}

const FavoriteSchema = new Schema<IFavouriteSchema>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    ref: { type: Schema.Types.ObjectId }
}, { timestamps: true })

export { FavoriteSchema }