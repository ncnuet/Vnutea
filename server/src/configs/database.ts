import mongoose from 'mongoose';
import config from './env';

const { MG_HOST, MG_PORT, MG_NAME, MG_USERNAME, MG_PASSWORD, MONGODB_URI } = config;

mongoose.set('strictQuery', true);

// export const connect = async () => mongoose.connect(`mongodb://${MG_HOST}:${MG_PORT}/${MG_NAME}`);
const uri = MONGODB_URI ? MONGODB_URI : `mongodb+srv://${MG_USERNAME}:${MG_PASSWORD}@${MG_HOST}/${MG_NAME}?retryWrites=true&w=majority`;

export const connect = async () => mongoose.connect(uri)