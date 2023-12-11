import { Document, ObjectId, Schema } from "mongoose";
import { UserBaseModel } from "../base/user.base";
import mongoosastic, { MongoosasticDocument } from "mongoosastic"

export enum EOutstandingType {
    TEACHER = "teacher",
    DEPARTMENT = "department",
    LAB = "lab"
}
export interface IOutstanding {
    image: string;
    ref: string;
    type: EOutstandingType;
    creator: string;
}

export interface IOutstandingSchema
    extends Omit<IOutstanding, "ref" | "creator">, Document, MongoosasticDocument {
    ref: ObjectId;
    creator: ObjectId;
}

const OutstandingSchema = new Schema<IOutstandingSchema>({
    image: { type: String, required: true },
    ref: { type: Schema.Types.ObjectId, required: true },
    creator: { type: Schema.Types.ObjectId, ref: UserBaseModel },
    type: { type: String, required: true },
}, {
    timestamps: true,
})

// @ts-ignore
OutstandingSchema.plugin(mongoosastic)

export default OutstandingSchema;
