import mongoose from 'mongoose';
import config from './env.config';

const { MG_HOST, MG_PORT, MG_NAME } = config;

export const connect = async () => mongoose.connect(`mongodb://${MG_HOST}:${MG_PORT}/${MG_NAME}`);