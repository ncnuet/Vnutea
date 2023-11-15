
import { IUserRole } from '@/types/auth';
import mongoose, { ObjectId, Schema } from 'mongoose';
var ObjectId = mongoose.Types.ObjectId;

export interface IUserSchema {
    username: string;
    password: string;
    role: IUserRole;
    version: number;
    email: string;
    name: string;
    major: string;
    teacher_profile: ObjectId;
    created_by: ObjectId;
}

export const UserSchema = new Schema<IUserSchema>({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    version: { type: Number, required: true },
    email: { type: String, unique: true, index: true },
    name: { type: String, required: true },
    major: { type: String, required: true },
    teacher_profile: { type: ObjectId },
    created_by: { type: ObjectId },
});