import { SignOptions } from "jsonwebtoken";
import config from "./env.config";

export const JWTOpt: SignOptions = {
    expiresIn: config.NODE_ENV === "dev" ? "10s" : "1800s" // 30 mins
}

export const JWTRefreshOpt: SignOptions = {
    expiresIn: config.NODE_ENV === "dev" ? "86400s" : "3600s" // 24 hours
}

export const TTLRefToken = config.NODE_ENV === "dev" ? 86400 : 3600 // 24 hours