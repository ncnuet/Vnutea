
import { ObjectId, Schema } from 'mongoose';

export interface IStudent {
    name: string;
    user: string;
    department: string;
    creator: string;
    classes: string[];
}

export interface IStudentSchema
    extends Omit<IStudent, "creator" | "department" | "user" | "classes"> {
    user: ObjectId;
    creator: ObjectId;
    department: ObjectId;
    classes: ObjectId[];
}

const StudentSchema = new Schema<IStudentSchema>({
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    department: { type: Schema.Types.ObjectId, required: true },
    creator: { type: Schema.Types.ObjectId, required: true },
    classes: { type: [Schema.Types.ObjectId], required: true },
}, { timestamps: true });

export default StudentSchema;