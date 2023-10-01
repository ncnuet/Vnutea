import dotenv, { DotenvParseOutput } from 'dotenv';
import path from 'path';

interface ENV_VALUE extends DotenvParseOutput {
    NODE_ENV: "dev" | "prod"
    APP_NAME: string
    BACKEND: string
    FRONTEND: string
    PORT: string
    CORS_ORIGIN: string

    DB_PORT: string
    DB_HOST: string
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string

    RD_PORT: string
    RD_HOST: string
    RD_PASSWORD: string

    MG_PORT: string
    MG_HOST: string
    MG_PASSWORD: string
    MG_NAME: string

    JWT_KEY: string
    JWT_REFRESH_KEY: string
    JWT_RESET_KEY: string
}

const config = dotenv.config(
    process.env.NODE_ENV.trim() === "dev"
        ? { path: path.resolve(process.cwd(), '.env.dev') }
        : undefined
).parsed;

export default {
    ...config,
    NODE_ENV: process.env.NODE_ENV.trim()
} as ENV_VALUE

