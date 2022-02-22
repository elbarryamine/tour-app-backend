import knex from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()
const isDev = process.env.NODE_ENV === 'development'
const db = knex({
  client: 'mysql2',
  connection: {
    host: isDev ? process.env.DB_HOST : process.env.PLANETSCALE_DB_HOST,
    database: isDev ? process.env.DB_NAME : process.env.PLANETSCALE_DB,
    user: isDev ? process.env.DB_USER : process.env.PLANETSCALE_DB_USERNAME,
    password: isDev ? process.env.DB_PASSWORD : process.env.PLANETSCALE_DB_PASSWORD,
    port: 3306,
  },
})

export default db
