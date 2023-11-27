import { Document, ObjectId, Schema } from "mongoose";
import { UserBaseModel } from "../base/user.base";
import mongoosastic, { MongoosasticDocument } from "mongoosastic"

export interface IOutstandingSchema extends Document, MongoosasticDocument {
    image: string;
    ref: ObjectId;
    type: "teacher" | "department" | "lab";
    initiator: ObjectId;
}

export const OutstandingSchema = new Schema<IOutstandingSchema>({
    image: { type: String, required: true },
    ref: { type: Schema.Types.ObjectId, required: true },
    initiator: { type: Schema.Types.ObjectId, ref: UserBaseModel },
    type: { type: String, required: true },
}, {
    timestamps: true,
})

// @ts-ignore
OutstandingSchema.plugin(mongoosastic)
