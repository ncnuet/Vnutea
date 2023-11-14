import * as bcrypt from "bcryptjs";
import { UserBaseModel } from "./base/user.base";
import { IQueryableUser, IUserWithoutVersion } from "@/types/auth";

class AuthModel {
    /**
     * Checks if the user is existed in the database. 
     * Search by the username/uid and verified by the password
     * @param _username username
     * @param _password 
     * @returns IUser if the user exists or undefined otherwise
     */
    async findUserByPassword(_username: string, _password: string): Promise<IUserWithoutVersion> {
        const user = await UserBaseModel.findOne(
            { username: _username },
            { _id: 1, role: 1, username: 1, password: 1 })
            .exec();

        if (!user) return undefined;

        const { _id, username, password, role } = user;
        return _password
            ? await bcrypt.compare(_password, password) && { uid: _id.toString(), username, role }
            : undefined
    }

    /**
     * Check if the user linking with given email is existed in the database.
     * @param email 
     * @returns UID if the user exists or undefined otherwise
     */
    async findUserByInfo(info: IQueryableUser): Promise<IQueryableUser> {
        const user = await UserBaseModel.findOne(
            {
                $or: [
                    { username: info.username },
                    { email: info.email },
                    { phone: info.phone },
                    { _id: info.uid }
                ]
            },
            { email: true, username: true, phone: true, _id: true })
            .exec()

        if (!user) return undefined;
        const { username, phone, _id, email } = user;

        return { username, phone, uid: _id.toString(), email };
    }

    /**
    * Reset password 
    * @param uid 
    * @param password 
    * @returns 
    */
    async updatePassword(uid: string, password: string): Promise<any> {
        const user = await UserBaseModel.updateOne(
            { _id: uid },
            { password: await bcrypt.hash(password, 10) })
            .exec();

        if (!user) return undefined;
    }
}

export default new AuthModel()