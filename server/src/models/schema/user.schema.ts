
import { EUserRole } from '@/types/auth';
import { ObjectId, Schema } from 'mongoose';

export interface IUser {
    username: string;
    password: string;
    role: EUserRole;
    version: number;
    email: string;
    name: string;
    major: string;
    teacher_profile: string;
    creator: string;
}

export interface IUserSchema
    extends Omit<IUser, "creator" | "teacher_profile" | "major"> {
    creator: ObjectId;
    teacher_profile: ObjectId;
    major: ObjectId;
}

const UserSchema = new Schema<IUserSchema>({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    version: { type: Number, required: true },
    email: { type: String, unique: true, index: true },
    name: { type: String, required: true },
    major: { type: Schema.Types.ObjectId, required: true },
    teacher_profile: { type: Schema.Types.ObjectId },
    creator: { type: Schema.Types.ObjectId },
});

export default UserSchema;