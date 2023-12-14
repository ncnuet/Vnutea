
import { EUserRole } from '@/types/auth';
import { ObjectId, Schema } from 'mongoose';
import { FavoriteSchema, IFavourite } from './favourite.schema';

export interface IUser {
    username: string;
    password: string;
    role: EUserRole;
    version: number;
    email: string;
    creator: string;
    name: string;
    favorites: IFavourite[]
}

export interface IUserSchema
    extends Omit<IUser, "creator" | "teacher_profile" | "department"> {
    creator: ObjectId;
    department: ObjectId;
}

const UserSchema = new Schema<IUserSchema>({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    version: { type: Number, required: true },
    email: { type: String, unique: true, index: true },
    creator: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    favorites: { type: [FavoriteSchema], required: true },
});

export default UserSchema;