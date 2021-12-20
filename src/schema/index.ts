import * as Graphql from 'graphql';
import { tourType, tourArgs, tourArgsImages } from './tour/tour.types';
import { createTourResolver, getToursResolver } from './tour/tour.resolver';

const rootSchema = new Graphql.GraphQLSchema({
	query: new Graphql.GraphQLObjectType({
		name: 'Query',
		fields: () => ({
			getTours: {
				type: new Graphql.GraphQLList(tourType),
				resolve: getToursResolver,
			},
		}),
	}),
	mutation: new Graphql.GraphQLObjectType({
		name: 'Mutation',
		fields: () => ({
			createTour: {
				type: Graphql.GraphQLBoolean,
				args: tourArgs,
				resolve: createTourResolver,
			},
		}),
	}),
});

export default rootSchema;

// createTour: {
// 	type: tourType,
// 	args: tourArgs,
// 	resolve: createTourResolver,
// },
