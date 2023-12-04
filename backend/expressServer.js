import express from 'express';
import cors from 'cors';
import userRouter from './controller/users.js';
import { connectMongo } from './util/mongoUtil.js';
import { errorHandler } from './middleware/middleware.js';

const expressServer = express();

connectMongo();

expressServer.use(cors());
expressServer.use(express.json());

expressServer.use('/api', userRouter);

expressServer.use(errorHandler);

export default expressServer;
