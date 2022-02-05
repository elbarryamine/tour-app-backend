import * as Graphql from 'graphql';
import {
	GetTourSchema,
	// TourArgs,
	SearchTourSchema,
	TourSearchArgs,
} from './tour/tour.types';
import { getToursResolver, searchToursResolver } from './tour/tour.resolver';
import { UserSignInSchemaType } from './user/user.types';
import { logInUser, signUpUser } from './user/user.resolver';

const rootSchema = new Graphql.GraphQLSchema({
	query: new Graphql.GraphQLObjectType({
		name: 'Query',
		fields: () => ({
			getTours: {
				type: new Graphql.GraphQLList(GetTourSchema),
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
				args: UserSignInSchemaType,
				resolve: signUpUser,
			},
			searchTour: {
				type: new Graphql.GraphQLList(GetTourSchema),
				args: TourSearchArgs,
				resolve: searchToursResolver,
			},
		}),
	}),
});

export default rootSchema;
