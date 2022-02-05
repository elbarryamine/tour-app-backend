import * as Graphql from 'graphql';
import {
	TourSchema,
	CreateTourSchema,
	TourArgs,
	TourSearchArgs,
	createTourArgs,
} from './tour/tour.types';
import {
	createTourResolver,
	getToursResolver,
	searchToursResolver,
} from './tour/tour.resolver';
import { UserSignInSchemaArgs } from './user/user.types';
import { logInUser, signUpUser } from './user/user.resolver';

const rootSchema = new Graphql.GraphQLSchema({
	query: new Graphql.GraphQLObjectType({
		name: 'Query',
		fields: () => ({
			getTours: {
				type: new Graphql.GraphQLList(TourSchema),
				resolve: getToursResolver,
			},
			signIn: {
				type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
				resolve: logInUser,
			},
		}),
	}),
	mutation: new Graphql.GraphQLObjectType({
		name: 'Mutation',
		fields: () => ({
			signUp: {
				type: Graphql.GraphQLBoolean,
				args: UserSignInSchemaArgs,
				resolve: signUpUser,
			},
			searchTour: {
				type: new Graphql.GraphQLList(TourSchema),
				args: TourSearchArgs,
				resolve: searchToursResolver,
			},
			createTour: {
				type: CreateTourSchema,
				args: createTourArgs,
				resolve: createTourResolver,
			},
		}),
	}),
});

export default rootSchema;
