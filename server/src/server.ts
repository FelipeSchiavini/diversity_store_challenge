import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import path from 'path';
import { authorizationChecker } from './app/middleware/authorization-checker';
import { config } from './config';

const ServerInitialize = async () => {
	const server = express();

	server.use(express.json());

	useExpressServer(server, {
		controllers: [path.join(__dirname, 'app/controllers/**/*.ts')],
		authorizationChecker: authorizationChecker,
	});

	return server.listen(config.apiPort, () => console.log(`Listening on port ${config.apiPort}`));
};

ServerInitialize();
