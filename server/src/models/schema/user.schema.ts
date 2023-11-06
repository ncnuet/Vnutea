
import { IUserRole, UID } from '@/types/auth';
import { Schema, model } from 'mongoose';

interface IUserSchema {
    uid: UID;
    username: string;
    password: string;
    role: IUserRole;
    version: number;
    email: string;
    phone: string;
}

const userSchema = new Schema<IUserSchema>({
    uid: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    version: { type: Number, required: true },
    email: { type: String, unique: true, index: true },
    phone: { type: String, unique: true, index: true }
});

export const UserBaseModel = model<IUserSchema>('User', userSchema);