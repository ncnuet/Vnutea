import { DotenvParseOutput, config as _conf } from 'dotenv';
import path from 'path';

interface ENV_VAL extends DotenvParseOutput {
    ENV: "dev" | "prod"
    APP_NAME: string
    BACKEND: string
    FRONTEND: string
    PORT: string
    CORS_ORIGIN: string

    MG_HOST: string
    MG_PORT: string
    MG_NAME: string
    MG_USERNAME: string
    MG_PASSWORD: string
    MONGODB_URI: string

    RD_PORT: string
    RD_HOST: string
    RD_PASSWORD: string
    RD_USERNAME: string


    JWT_KEY: string
    JWT_CHAT: string
    JWT_REFRESH_KEY: string
    JWT_RESET_KEY: string

    MAIL_SERVICE: string
    MAIL_USER: string
    MAIL_PASSWORD: string

    CLOUDINARY_CLOUD_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
}
const { NODE_ENV, ..._override } = process.env;
const override = _override ? _override as Object : {};

const data = _conf(
    NODE_ENV === "dev"
        ? { path: path.resolve(process.cwd(), '.env.dev') }
        : undefined
).parsed

const config = {
    ...data,
    ENV: process.env.NODE_ENV,
    ...override
} as ENV_VAL;

export const env = process.env.NODE_ENV

export default config;