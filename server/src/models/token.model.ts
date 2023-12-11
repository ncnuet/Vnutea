import { redis } from "@/configs/redis";
import { IUserRole } from "@/types/auth";
import { NameType, getKey } from "@/utils/redis_name";

class TokenModel {
    /**
    * Insert refresh token into the database.
    * @param refreshToken 
    * @returns true if inserted successfully.
    */
    async insertRefreshToken(refreshToken: string, uid: string, role: IUserRole) {
        await redis.set(getKey(uid, NameType.USER_VERSION), 0, { NX: true })

        if (!(await redis.json.set(getKey(refreshToken, NameType.TOKEN), '$', { uid, token: refreshToken }) === "OK" &&
            await redis.set(getKey(uid, NameType.USER_ROLE), role) === "OK")) {
            throw new Error("Unable to add refresh token");
        }
    }

    /**
     * Checks if the refresh token is stored in the database.
     * @param refreshToken 
     * @returns 
     */
    async getRefreshToken(refreshToken: string): Promise<string> {
        return <string>await redis.json.get(getKey(refreshToken, NameType.TOKEN))
    }

    /**
     * 
     * @param uid 
     * @returns 
     */
    async deleteRefreshToken(uid: string) {
        const tokens = await redis.ft.search("idx:token", `@uid:"${uid}"`)
        tokens && await Promise.all(
            tokens.documents.map(token => redis.json.del(token.id))
        )
    }

    /**
     * 
     * @param uid 
     * @returns 
     */
    async updateVersion(uid: string) {
        if (!redis.incr(getKey(uid, NameType.USER_VERSION))) {
            throw new Error("Unable to update version");

        }
    }

    async getVersion(uid: string) {
        return await redis.get(getKey(uid, NameType.USER_VERSION));
    }

    async getRole(uid: string): Promise<IUserRole> {
        return <IUserRole>await redis.get(getKey(uid, NameType.USER_ROLE));
    }
}

export default new TokenModel();