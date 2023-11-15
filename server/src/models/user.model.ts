import { ObjectId } from "mongoose";
import { UserBaseModel } from "./base/user.base";

class UserModel {
    async validateUID(uids: string[]): Promise<boolean> {
        const ref = Array.from(new Set<string>(uids));
        const result = await UserBaseModel.find(
            { _id: { $in: ref, } }, { _id: 1 }).exec();
        const userIDs = result.map(doc => doc._id.toString());

        return ref.every(uid => userIDs.includes(uid))
    }

    async getUsers(uids: ObjectId[]) {
        const user = await UserBaseModel.find(
            { _id: { $in: uids } },
            { email: true, username: true, phone: true, _id: true, role: 1 })
            .exec()

        if (!user) return undefined;

        return user.map(user => {
            const { username, phone, _id: uid, email, role } = user;
            return { username, phone, uid, email, role }
        })
    }
}

export default new UserModel()