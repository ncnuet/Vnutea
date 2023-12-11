import * as bcrypt from "bcryptjs";
import { UserBaseModel } from "./base/user.base";
import { IQueryableUser, IUserWithoutVersion } from "@/types/auth";
import { ICreateUser } from "@/validators/auth.validator";

class AuthModel {
    async findUserByPassword(_username: string, _password: string): Promise<IUserWithoutVersion> {
        const user = await UserBaseModel.findOne(
            { username: _username },
            { _id: 1, role: 1, username: 1, password: 1 })
            .exec();

        if (!user) return undefined;

        const { _id, username, password, role } = user;
        return _password
            ? await bcrypt.compare(_password, password) &&
            { uid: _id.toString(), username, role }
            : undefined
    }

    async findUserByInfo(info: IQueryableUser): Promise<IQueryableUser> {
        const user = await UserBaseModel.findOne(
            {
                $or: [
                    { username: info.username },
                    { email: info.email },
                    { _id: info.uid }
                ]
            },
            { email: true, username: true, phone: true, _id: true })
            .exec()

        if (!user) return undefined;
        const { username, _id, email } = user;

        return { username, uid: _id.toString(), email };
    }

    async createUser(creator: string, profile: string, user: ICreateUser) {
        const { username, name, major, role } = user;
        const _user = await UserBaseModel.create(
            {
                username, name, role, major, creator,
                version: 0,
                teacher_profile: profile,
                email: username + "@vnu.edu.vn",
                password: await bcrypt.hash("123456789", 10),
            }
        )

        return _user._id;
    }
}

export default new AuthModel()