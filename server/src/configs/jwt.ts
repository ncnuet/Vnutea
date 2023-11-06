import * as jwt from "jsonwebtoken";
import env from "@/configs/env.config"

export const JWTTokenOpt: jwt.SignOptions = {
    expiresIn: env.ENV === "dev" ? "10s" : "3600s"
}
export const JWTRefreshOpt: jwt.SignOptions = {
    expiresIn: env.ENV === "dev" ? "60s" : "86400s"
}
export const JWTResetOpt: jwt.SignOptions = {
    expiresIn: env.ENV === "dev" ? "180s" : "300s"
}