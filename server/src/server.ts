import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import path from 'path';
import { authorizationChecker } from './app/middleware/authorization-checker';
import { currentUserChecker } from './app/middleware/current-user-checker';

const ServerInitialize = async () => {
	const server = express();

	server.use(express.json());

	useExpressServer(server, {
		controllers: [path.join(__dirname, 'app/controllers/**/*.ts')],
		cors: true,
		defaultErrorHandler: true, 
		authorizationChecker,
		currentUserChecker,
	});
	const port = process.env.PORT || '3333'
	return server.listen(port, () => console.log(`Listening on port ${port}`));
};

ServerInitialize();
