import { UserBaseModel } from "./base/user.base";

class UserModel {
    async validateUID(uids: string[]):Promise<boolean> {
        const ref = Array.from(new Set<string>(uids));
        const result = await UserBaseModel.find(
            { _id: { $in: ref, } }, { _id: 1 }).exec();        
        const userIDs = result.map(doc => doc._id.toString());

        return ref.every(uid => userIDs.includes(uid))
    }
}

export default new UserModel()