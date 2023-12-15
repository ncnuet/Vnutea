import { ICreateUser } from "@/validators/user.validator";
import { UserBaseModel } from "./base/user.base";
import * as bcrypt from "bcryptjs";
import { IAddFavourite } from "@/validators/me.validator";

export default class UserModel {
    static async validateUID(uids: string[]): Promise<boolean> {
        const ref = Array.from(new Set<string>(uids));
        const result = await UserBaseModel.find(
            { _id: { $in: ref, } }, { _id: 1 }).exec();
        const userIDs = result.map(doc => doc._id.toString());

        return ref.every(uid => userIDs.includes(uid))
    }

    static async getUsers(uids: string[]) {
        const user = await UserBaseModel.find(
            { _id: { $in: uids } },
            { email: true, username: true, _id: true, role: 1, name: 1 })
            .exec()

        if (!user) return undefined;

        return user.map(user => {
            const { username, _id: uid, email, role } = user;
            return { username, uid, email, role }
        })
    }

    static async create(user: ICreateUser) {
        const { username, role, name, creator } = user;
        const _user = await UserBaseModel.create(
            {
                username, role, creator, name,
                version: 0,
                favorites: [],
                email: username + "@vnu.edu.vn",
                password: await bcrypt.hash("123456789", 10),
            }
        )

        return _user._id.toString();
    }

    static async delete(id: string) {
        const response = await UserBaseModel.deleteOne({ _id: id });

        return response.acknowledged;
    }

    static async addFavorite(id: string, data: IAddFavourite) {
        const response = await UserBaseModel.updateOne(
            { _id: id },
            {
                $push: {
                    favorites: {
                        name: data.name,
                        ref: data.ref,
                        type: data.type
                    }
                }
            });

        return response.acknowledged;
    }

    static async getFavourites(id: string) {
        const response = await UserBaseModel.findOne(
            { _id: id },
            { favorites: 1 }
        ).exec();

        return response ? response.favorites : [];
    }
}