import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import configServer from './server-config';

import connectDB from '../mongo';
import { DATABASE_URL, PORT } from './config/const';

//  ------------------------- Setup Variables
const app = express();

configServer(app);
connectDB(DATABASE_URL)
	.then(async () => {
		console.log('Database connected');
	})
	.catch((err) => {
		console.error(err);
		process.exit();
	});

const server = app.listen(PORT, async () => {
	console.log(`Server running on port ${PORT}`);
});

process.setMaxListeners(0);
process.on('unhandledRejection', (err: Error) => {
	console.error(err);
	server.close(() => process.exit(1));
});
