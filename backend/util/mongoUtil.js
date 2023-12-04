import mongoose from 'mongoose';
import Config from './config.js';
import Logger from './logger.js';

export const connectMongo = () => {
    mongoose
        .connect(Config.MONGO_URL)
        .then(() => Logger.info('Successfully connected to MongoDb'))
        .catch(err =>
            Logger.error('Error connecting to MongoDb:', err.message)
        );
};
