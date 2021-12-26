import * as Graphql from 'graphql';
import { TourType, GetTourType } from './tour/tour.types';
import { createTourResolver, getToursResolver } from './tour/tour.resolver';
import { UserSignInSchemaType } from './user/user.types';
import { signInUser, signUpUser } from './user/user.resolver';

const rootSchema = new Graphql.GraphQLSchema({
	query: new Graphql.GraphQLObjectType({
		name: 'Query',
		fields: () => ({
			getTours: {
				type: new Graphql.GraphQLList(GetTourType),
				resolve: getToursResolver,
			},
			SignIn: {
				type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
				resolve: signInUser,
			},
		}),
	}),
	mutation: new Graphql.GraphQLObjectType({
		name: 'Mutation',
		fields: () => ({
			createTour: {
				type: Graphql.GraphQLBoolean,
				args: TourType,
				resolve: createTourResolver,
			},
			SignUp: {
				type: Graphql.GraphQLBoolean,
				args: UserSignInSchemaType,
				resolve: signUpUser,
			},
		}),
	}),
});

export default rootSchema;
