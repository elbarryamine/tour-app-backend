import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import rootSchema from './schema';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(
	'/graphql',
	graphqlHTTP({
		schema: rootSchema,
		graphiql: true,
	})
);

const port = process.env.PORT || 3000;
process.on('unhandledRejection', (err: any) => {
	console.error(err.message);
});
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
