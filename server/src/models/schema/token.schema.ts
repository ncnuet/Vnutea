import { redis } from "@/configs/redis";
import { RediSearchSchema, SchemaFieldTypes } from "redis";

export const schema: RediSearchSchema = {
    '$.token': {
        type: SchemaFieldTypes.TEXT,
        AS: 'token'
    },
    '$.uid': {
        type: SchemaFieldTypes.TEXT,
        AS: 'uid'
    }
};

export async function setTokenIndex() {
    try {
        await redis.ft.create('idx:token', schema, {
            ON: 'JSON',
            PREFIX: 'token_'
        });
    } catch (e) {
        if (e.message === 'Index already exists') {
            console.log('Index exists already, skipped creation.');
        } else {
            console.error(e);
        }
    }
}