import { Document, ObjectId, Schema } from "mongoose";

export interface IComment {
    creator: string
    content: string
}

export interface ICommentSchema extends Omit<IComment, "creator">, Document {
    creator: ObjectId
}

export const CommentSchema = new Schema<ICommentSchema>({
    creator: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true }
}, {
    timestamps: true
})