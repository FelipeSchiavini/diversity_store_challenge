interface IConfig {
	apiPort: string;
	jwtSecret: string;
}

export const config: IConfig = {
	apiPort: process.env.PORT ?? '3333',
	jwtSecret: process.env.JWT_SECRET as string,
};
