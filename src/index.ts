import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import Schema from './graphql'
import * as dotenv from 'dotenv'
import { GraphQLError } from 'graphql'
// import multer from 'multer'
import tourRouter from './router/tours'
import devRouter from './router/dev'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

dotenv.config()
async function MongoConnect() {
  const mongo_db_url = `mongodb+srv://${process.env.MongoDbUser}:${process.env.MongoDbPass}@cluster0.xyqdo.mongodb.net/${process.env.MongoDbName}?retryWrites=true&w=majority`
  await mongoose.connect(mongo_db_url).then(() => console.log(`connected to MongoDB:${process.env.MongoDbName} ❤`))
}
MongoConnect().catch(() => console.log(`failed to connected to MongoDB:${process.env.MongoDbName} 😢`))

// const upload = multer({ dest: 'uploads/' })
const app = express()
app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
app.use(cookieParser())
app.get('/', (req, res) => {
  res.status(200).json({ data: 'Working' })
})
app.use(tourRouter)
app.use(devRouter)
app.use(
  '/graphql',
  graphqlHTTP({
    schema: Schema,
    graphiql: true,
    customFormatErrorFn: ({ message, path }: GraphQLError) => {
      return { message, path }
    },
  })
)

process.on('unhandledRejection', (err: any) => {
  console.error(err.message)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
