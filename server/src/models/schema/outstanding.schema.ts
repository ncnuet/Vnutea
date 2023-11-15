import mongoose, { ObjectId, Schema } from "mongoose";
import { UserBaseModel } from "../base/user.base";

export interface IOutstanding {
    image: string;
    ref: ObjectId;
    docModel: any;
    initiator: ObjectId;
}

export const OutstandingSchema = new Schema<IOutstanding>({
    image: { type: String, required: true },
    ref: { type: Schema.Types.ObjectId, refPath: 'docModel' },
    initiator: { type: Schema.Types.ObjectId, ref: UserBaseModel },
    docModel: {
        type: String,
        require: true,
        enum: ['Teacher', 'Department']
    }
})