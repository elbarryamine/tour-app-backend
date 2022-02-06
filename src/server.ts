import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import rootSchema from './schema';
import * as dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
import multer from 'multer';
import tourRouter from './router/tours';
dotenv.config();
const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(cors());

app.get('/', (req, res) => {
	res.status(200).json({
		data: 'Working',
	});
});
app.use(tourRouter);
app.use(
	'/graphql',
	graphqlHTTP({
		schema: rootSchema,
		graphiql: true,
		customFormatErrorFn: (err: GraphQLError) => {
			return {
				message: err.message,
			};
		},
	})
);

process.on('unhandledRejection', (err: any) => {
	console.error(err.message);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
