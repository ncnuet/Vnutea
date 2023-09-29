import database from "@/configs/database";
import { IUser, IUserRole } from "@/types/auth";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import * as bcrypt from "bcryptjs";

class AuthModel {
    async findAccountByPassword(info: string, password: string): Promise<IUser> {
        const query = `
            SELECT password, uid, version, username, role 
            FROM account 
            WHERE provider=? AND username=? OR uid=? 
            LIMIT 1`;

        const [results] = await database.execute<RowDataPacket[]>(query, ["local", info, info]);

        if (!results.length) return undefined;
        const { hashPassword, ...userData } = results.map(row => ({
            hashPassword: row["password"],
            uid: row["uid"],
            username: row["username"],
            role: row["role"],
            version: row["version"]
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

    /**
     * Insert refresh token into the database.
     * @param refreshToken 
     * @returns true if inserted successfully.
     */
    async insertRefreshToken(refreshToken: string, uid: string): Promise<boolean> {
        const query = `
            INSERT INTO refresh_token(token, uid) 
            VALUES (?, ?)`;

        const [result] = await database.execute<ResultSetHeader>(query, [refreshToken, uid]);

        return result.affectedRows > 0;
    }

    /**
     * Checks if the refresh token is stored in the database.
     * @param refreshToken 
     * @returns 
     */
    async checkRefreshToken(refreshToken: string): Promise<boolean> {
        const query = `
            SELECT token 
            FROM refresh_token 
            WHERE token=? LIMIT 1`;

        const [results] = await database.execute<RowDataPacket[]>(query, [refreshToken]);

        return results.length > 0;
    }

    /**
     * 
     * @param uid 
     * @returns 
     */
    async deleteRefreshToken(uid: string): Promise<boolean> {
        const query = `
            DELETE FROM refresh_token
            WHERE uid = ?`;

        const [results] = await database.execute<ResultSetHeader>(query, [uid]);

        return results.affectedRows > 0;
    }

    /**
     * 
     * @param uid 
     * @returns 
     */
    async updateVersion(uid: string) {
        const query = `
            UPDATE account 
            SET version = version + 1 
            WHERE uid = ?`;

        const [results] = await database.execute<ResultSetHeader>(query, [uid]);

        return results.affectedRows > 0;
    }
}

export default new AuthModel();