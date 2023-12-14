import { redis } from "@/configs/redis";
import { IUserRole } from "@/types/auth";
import { NameType, getKey } from "@/utils/redis_name";

export default class TokenModel {
    static async insertRefreshToken(refreshToken: string, uid: string, role: IUserRole) {
        await redis.set(getKey(uid, NameType.USER_VERSION), 0, { NX: true })

        if (!(await redis.json.set(getKey(refreshToken, NameType.TOKEN), '$', { uid, token: refreshToken }) === "OK" &&
            await redis.set(getKey(uid, NameType.USER_ROLE), role) === "OK")) {
            throw new Error("Unable to add refresh token");
        }
    }

    static async getRefreshToken(refreshToken: string): Promise<string> {
        return <string>await redis.json.get(getKey(refreshToken, NameType.TOKEN))
    }

    static async deleteRefreshToken(uid: string) {
        const tokens = await redis.ft.search("idx:token", `@uid:"${uid}"`)
        tokens && await Promise.all(
            tokens.documents.map(token => redis.json.del(token.id))
        )
    }

    static updateVersion(uid: string) {
        if (!redis.incr(getKey(uid, NameType.USER_VERSION))) {
            throw new Error("Unable to update version");

        }
    }

    static async getVersion(uid: string) {
        return await redis.get(getKey(uid, NameType.USER_VERSION));
    }

    static async getRole(uid: string): Promise<IUserRole> {
        return <IUserRole>await redis.get(getKey(uid, NameType.USER_ROLE));
    }
}