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

    JWT_KEY: string
    JWT_REFRESH_KEY: string
    JWT_RESET_KEY: string
}

export default dotenv.config(
    process.env.NODE_ENV.trim() === "dev"
        ? { path: path.resolve(process.cwd(), '.env.dev') }
        : undefined
).parsed as ENV_VALUE;


