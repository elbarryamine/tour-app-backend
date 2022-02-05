import * as Graphql from 'graphql';

export const GetTourSchema = new Graphql.GraphQLObjectType({
	name: 'Tour',
	fields() {
		return { ...TourArgs, ...TourImagesArgs };
	},
});
export const SearchTourSchema = new Graphql.GraphQLObjectType({
	name: 'SearchTour',
	fields() {
		return TourSearchArgs;
	},
});
export const TourArgs = {
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
export const TourImagesArgs = {
	mainImage: {
		type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
	},
	images: {
		type: new Graphql.GraphQLNonNull(
			new Graphql.GraphQLList(Graphql.GraphQLString)
		),
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

// fix type TourInterface
export type TourArgsInterface = {
	name: string;
	category: string[];
	rating: number;
	location: string[];
	duration: string;
	description: string;
	features: string[];
	price: string;
	discount: string;
	mainImage: string;
	images: string[];
};
export type TourSearchArgsInterface = {
	search: string;
	type: string;
	priceRangeMin: string;
	priceRangeMax: string;
	date: string;
	duration: string;
};
