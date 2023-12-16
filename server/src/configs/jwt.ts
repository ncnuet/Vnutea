import * as jwt from "jsonwebtoken";
import env from "@/configs/env"

export const JWTTokenOpt: jwt.SignOptions = {
    expiresIn: env.ENV === "dev" ? "3600s" : "3600s"
}
export const JWTRefreshOpt: jwt.SignOptions = {
    expiresIn: env.ENV === "dev" ? "3600s" : "86400s"
}
export const JWTResetOpt: jwt.SignOptions = {
    expiresIn: env.ENV === "dev" ? "180s" : "300s"
}
export const JWTChatOpt: jwt.SignOptions = {
    expiresIn: env.ENV === "dev" ? "3600s" : "86400s"
}