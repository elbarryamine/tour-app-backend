import * as Graphql from 'graphql';

export const GetTourType = new Graphql.GraphQLObjectType({
	name: 'CreateTour',
	fields: () => {
		return { ...TourType, ...TourTypeImages };
	},
});
export const TourType = {
	name: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
	},
	category: {
		type: new Graphql.GraphQLNonNull(
			new Graphql.GraphQLList(Graphql.GraphQLString)
		),
	},
	rating: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
	},
	location: {
		type: new Graphql.GraphQLNonNull(
			new Graphql.GraphQLList(Graphql.GraphQLString)
		),
	},
	duration: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
	},
	description: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
	},
	features: {
		type: new Graphql.GraphQLNonNull(
			new Graphql.GraphQLList(Graphql.GraphQLString)
		),
	},
	price: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
	},
	discount: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
	},
};
export const TourTypeImages = {
	mainImage: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
	},
	images: {
		type: new Graphql.GraphQLNonNull(
			new Graphql.GraphQLList(Graphql.GraphQLString)
		),
	},
};

// fix type TourInterface
export type TourInterface = typeof TourType;
