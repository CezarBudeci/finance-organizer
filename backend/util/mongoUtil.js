import mongoose from 'mongoose';
import Config from './config.js';
import Logger from './logger.js';
import { throwInternalServerError } from './errorUtil.js';
import { initializeCategories } from './categoryUtil.js';

export const connectMongo = () => {
    mongoose
        .connect(Config.MONGO_URL)
        .then(() => {
            Logger.info('Successfully connected to MongoDb');
            initializeCategories();
        })
        .catch(err => {
            Logger.error('Error connecting to MongoDb:', err.message);
            throwInternalServerError('Failed to connect to database');
        });
};
