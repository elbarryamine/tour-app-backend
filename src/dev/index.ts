import * as graphql from 'graphql';
import { createTour } from '../functions';
import { DateType } from '../graphql';
const rootSchema = new graphql.GraphQLSchema({
	query: new graphql.GraphQLObjectType({
		name: 'Query',
		fields: () => ({
			getTours: {
				type: graphql.GraphQLString,
				resolve: function (parent, args, context, info) {
					return 'hi';
				},
			},
		}),
	}),
	mutation: new graphql.GraphQLObjectType({
		name: 'Mutation',
		fields: () => ({
			createTour: {
				type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean),
				args: {
					name: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString),
					},
					category: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString),
					},
					rating: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLInt),
					},
					location: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString),
					},
					duration: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString),
					},
					description: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString),
					},
					features: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString),
					},
					price: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString),
					},
					discount: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString),
					},
					mainImage: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString),
					},
					images: {
						type: new graphql.GraphQLNonNull(graphql.GraphQLString),
					},
				},
				resolve: createTour,
			},
		}),
	}),
});

export default rootSchema;
