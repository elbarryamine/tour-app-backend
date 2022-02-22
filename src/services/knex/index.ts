import knex from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()
const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.PLANETSCALE_DB_HOST,
    database: process.env.PLANETSCALE_DB_NAME,
    user: process.env.PLANETSCALE_DB_USER,
    password: process.env.PLANETSCALE_DB_PASSWORD,
    port: 3306,
  },
})

export default db
