require('dotenv').config(
	{path: '.env'}
);

// Update with your config settings.

module.exports = {

	development: {
		client: 'mysql2',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_DATABASE,
			insecureAuth: true

		},
		migrations: {
			directory: './src/database/migrations'
		},
		useNullAsDefault: true
	},

	test: {
		filename: './src/database/db.sqlite'
	},

	staging: {
		client: 'mysql',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_DATABASE,
			insecureAuth: true

		},
		migrations: {
			tableName: './src/database/migrations'
		}
	},

	production: {
		client: 'mysql',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_DATABASE,
			insecureAuth: true

		},
		migrations: {
			directory: './src/database/migrations'
		},
		useNullAsDefault: true
	}

}
