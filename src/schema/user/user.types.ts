import * as Graphql from 'graphql';

export const UserSignUpSchemaType = {
	email: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
	password: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
};

export type UserSignUpType = {
	email: string;
	password: string;
};
export const UserSignInSchemaType = {
	firstName: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
	lastName: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
	email: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
	phone: { type: Graphql.GraphQLString },
	password: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
	passwordConfirm: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
	birthDate: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
};

export type UserSignInType = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	passwordConfirm: string;
	birthDate: string;
};
