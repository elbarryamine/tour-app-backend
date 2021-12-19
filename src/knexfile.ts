// Update with your config settings.
require('dotenv').config({ path: '../.env' });

module.exports = {
	development: {
		client: 'mysql2',
		connection: {
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			port: 3306,
		},
		migrations: {},
	},

	staging: {
		client: 'mysql2',
		connection: {
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			port: 3306,
		},
		migrations: {},
	},

	production: {
		client: 'mysql2',
		connection: {
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			port: 3306,
		},
		migrations: {},
	},
};
