import { ObjectId, Schema } from "mongoose";
var ObjectId = Schema.Types.ObjectId;

export interface ISeenSchema {
    uid: ObjectId,
    readAt: Date
}

export const SeenSchema = new Schema<ISeenSchema>({
    uid: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    readAt: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: false,
});