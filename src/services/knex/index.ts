import knex from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()
const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
  },
})

export default db
