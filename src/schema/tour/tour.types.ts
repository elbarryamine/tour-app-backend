import * as Graphql from 'graphql';

export const TourSchema = new Graphql.GraphQLObjectType({
	name: 'Tour',
	fields() {
		return TourArgs;
	},
});
export const CreateTourSchema = new Graphql.GraphQLObjectType({
	name: 'CreateTour',
	fields() {
		return TourArgs;
	},
});

export const TourArgs = {
	id: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
	},
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
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
	},
	discount: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
	},
	mainImage: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
	},
	images: {
		type: new Graphql.GraphQLNonNull(
			new Graphql.GraphQLList(Graphql.GraphQLString)
		),
	},
	createdBy: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
	},
};
export const TourSearchArgs = {
	search: {
		type: Graphql.GraphQLString,
	},
	type: {
		type: Graphql.GraphQLString,
	},
	priceRangeMin: {
		type: Graphql.GraphQLString,
	},
	priceRangeMax: {
		type: Graphql.GraphQLString,
	},
	date: {
		type: Graphql.GraphQLString,
	},
	duration: {
		type: Graphql.GraphQLString,
	},
};

export const createTourArgs = {
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
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
	},
	discount: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
	},
};
export const deleteTourArgs = {
	id: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
	},
};
