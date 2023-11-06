import { createClient } from 'redis';
import config from "./env.config"
import { setTokenIndex } from '@/models/schema/token.schema';

export const redis = createClient({
    password: config.RD_PASSWORD,
    socket: {
        host: config.RD_HOST,
        port: Number(config.RD_PORT)
    }
})

export async function setupRedisIndex() {
    await setTokenIndex();
}

export async function startup(){
    await redis.connect()
    await setupRedisIndex();
}