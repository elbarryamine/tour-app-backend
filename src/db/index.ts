import knex from 'knex';

const knexConfig = knex({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		port: 3306,
	},
});

export default knexConfig;
