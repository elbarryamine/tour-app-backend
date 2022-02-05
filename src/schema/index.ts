import * as Graphql from 'graphql';
import {
	TourSchema,
	CreateTourSchema,
	TourSearchArgs,
	createTourArgs,
	deleteTourArgs,
} from './tour/tour.types';
import {
	createTourResolver,
	deleteTourResolver,
	getToursResolver,
	searchToursResolver,
} from './tour/tour.resolver';
import { UserSignInSchemaArgs, UserSignUpSchemaArgs } from './user/user.types';
import { logInUser, signUpUser } from './user/user.resolver';

const rootSchema = new Graphql.GraphQLSchema({
	query: new Graphql.GraphQLObjectType({
		name: 'Query',
		fields: () => ({
			getTours: {
				type: new Graphql.GraphQLList(TourSchema),
				resolve: getToursResolver,
			},
			searchTour: {
				type: new Graphql.GraphQLList(TourSchema),
				args: TourSearchArgs,
				resolve: searchToursResolver,
			},
			signIn: {
				type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
				args: UserSignInSchemaArgs,
				resolve: logInUser,
			},
		}),
	}),
	mutation: new Graphql.GraphQLObjectType({
		name: 'Mutation',
		fields: () => ({
			signUp: {
				type: Graphql.GraphQLBoolean,
				args: UserSignUpSchemaArgs,
				resolve: signUpUser,
			},
			createTour: {
				type: CreateTourSchema,
				args: createTourArgs,
				resolve: createTourResolver,
			},
			deleteTour: {
				type: Graphql.GraphQLBoolean,
				args: deleteTourArgs,
				resolve: deleteTourResolver,
			},
		}),
	}),
});

export default rootSchema;
