import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import path from 'path';
import { authorizationChecker } from './app/middleware/authorization-checker';
import { config } from './config';
import { errorHandler } from './app/middleware/error-handler';

const ServerInitialize = async () => {
	const server = express();

	server.use(express.json());

	useExpressServer(server, {
		cors: true,
		controllers: [path.join(__dirname, 'app/controllers/**/*.ts')],
		authorizationChecker: authorizationChecker,
		defaultErrorHandler: true, 
	});

	// server.use(errorHandler)
	return server.listen(config.apiPort, () => console.log(`Listening on port ${config.apiPort}`));
};

ServerInitialize();
