import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import rootSchema from './graphql';
import graphqlMiddelware from './graphql/middleware';
import { connect } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
console.log(process.env.MongoDbUser);
async function mongodbConnect() {
	try {
		await connect(`mongodb+srv://${process.env.MongoDbUser}:${process.env.MongoDbPassword}@cluster0.rldb1.mongodb.net/${process.env.MongoDbName}?retryWrites=true&w=majority`);
		console.log('connected');
	} catch (e) {
		console.log(e);
	}
}
mongodbConnect();

const app = express();
app.use(cors());
app.use(
	'/graphql',
	graphqlMiddelware,
	graphqlHTTP({
		schema: rootSchema,
		graphiql: true,
	})
);

const port = 3000;
app.listen(port, () => {
	console.log('listening');
});
