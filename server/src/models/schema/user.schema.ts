
import { IUserRole } from '@/types/auth';
import { Schema } from 'mongoose';

export interface IUserSchema {
    username: string;
    password: string;
    role: IUserRole;
    version: number;
    email: string;
    phone: string;
}

export const UserSchema = new Schema<IUserSchema>({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    version: { type: Number, required: true },
    email: { type: String, unique: true, index: true },
    phone: { type: String, unique: true, index: true }
});