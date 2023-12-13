import { Schema, ObjectId, Document } from "mongoose";
import mongoosastic, { MongoosasticDocument } from "mongoosastic";
import { CommentSchema, IComment } from "./comment.schema";

export interface IClass {
    name: string;
    classID: string;
    teacher: string;
    description?: string;
    students: string[];
    creator: string;
    rating: number;
    comments: IComment[]
}

export interface IClassSchema
    extends Omit<IClass, "teacher" | "students" | "creator">, MongoosasticDocument, Document {
    teacher: ObjectId;
    creator: ObjectId;
    students: ObjectId;
}

const ClassSchema = new Schema<IClassSchema>({
    name: { type: String, required: true, es_index: true },
    classID: { type: String, required: true, es_index: true },
    teacher: { type: Schema.Types.ObjectId, required: true },
    description: { type: String },
    creator: { type: Schema.Types.ObjectId, required: true },
    students: { type: [Schema.Types.ObjectId], required: true },
    rating: { type: Number, required: true },
    comments: { type: [CommentSchema], required: true },
}, {
    timestamps: true
})

// @ts-ignore
ClassSchema.plugin(mongoosastic);

export { ClassSchema }