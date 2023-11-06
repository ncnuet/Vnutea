import { DotenvParseOutput, config } from 'dotenv';
import path from 'path';

interface ENV_VAL extends DotenvParseOutput {
    ENV: "dev" | "prod"
    APP_NAME: string
    BACKEND: string
    FRONTEND: string
    HOSTNAME: string
    PORT: string
    CORS_ORIGIN: string

    MG_HOST: string
    MG_PORT: string
    MG_NAME: string

    JWT_KEY: string
    JWT_REFRESH_KEY: string
    JWT_RESET_KEY: string

    MAIL_SERVICE: string
    MAIL_USER: string
    MAIL_PASSWORD: string
}
const data = config(
    process.env.NODE_ENV === "dev"
        ? { path: path.resolve(process.cwd(), '.env.dev') }
        : undefined
).parsed

export const env = process.env.NODE_ENV
export default {
    ...data,
    ENV: process.env.NODE_ENV
} as ENV_VAL;