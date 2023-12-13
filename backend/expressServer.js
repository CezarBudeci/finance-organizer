import express from 'express';
import cors from 'cors';
import userRouter from './controller/users.js';
import balanceRouter from './controller/balances.js';
import categoryRouter from './controller/categories.js';
import expenseRouter from './controller/expenses.js';
import profileRouter from './controller/profiles.js';
import { connectMongo } from './util/mongoUtil.js';
import { authenticate, errorHandler } from './middleware/middleware.js';

const expressServer = express();

connectMongo();

expressServer.use(cors());
expressServer.use(express.json());

expressServer.use('/api', userRouter);
expressServer.use('/api/balances', authenticate, balanceRouter);
expressServer.use('/api/categories', authenticate, categoryRouter);
expressServer.use('/api/expenses', authenticate, expenseRouter);
expressServer.use('/api/profiles', authenticate, profileRouter);

expressServer.use(errorHandler);

export default expressServer;
