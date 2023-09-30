import database from "@/configs/database";
import { IUserRole, IUserWithoutVersion } from "@/types/auth";
import { RowDataPacket } from "mysql2";
import * as bcrypt from "bcryptjs";

class AuthModel {
    async findAccountByPassword(info: string, password: string): Promise<IUserWithoutVersion> {
        const query = `
            SELECT password, uid, username, role 
            FROM account 
            WHERE provider=? AND username=? OR uid=? 
            LIMIT 1`;

        const [results] = await database.execute<RowDataPacket[]>(query, ["local", info, info]);

        if (!results.length) return undefined;
        const { hashPassword, ...userData } = results.map(row => ({
            hashPassword: row["password"],
            uid: row["uid"],
            username: row["username"],
            role: row["role"]
        }))[0];

        return hashPassword
            ? await bcrypt.compare(password, hashPassword) && userData
            : undefined
    }

    /**
     * 
     * @param uid 
     * @returns 
     */
    async findRole(uid: string): Promise<IUserRole> {
        const query = `
                SELECT role 
                FROM account_detail 
                WHERE uid = ? 
                LIMIT 1`;

        const [results] = await database.execute<RowDataPacket[]>(query, [uid]);

        if (!results.length) return undefined;
        return results[0]["role"];
    }
}

export default new AuthModel();