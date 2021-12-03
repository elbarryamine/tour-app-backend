import * as gq from 'graphql';

const rootSchema = new gq.GraphQLSchema({
	query: new gq.GraphQLObjectType({
		name: 'Query',
		fields: () => ({
			getResponse: {
				type: gq.GraphQLString,
				resolve: function (parent, args, context, info) {
					return 'hi';
				},
			},
		}),
	}),
	// mutation: new gq.GraphQLObjectType({
	// 	name: 'Mutation',
	// 	fields: () => ({

	// 	}),
	// }),
});

export default rootSchema;
