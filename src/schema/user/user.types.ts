import * as Graphql from 'graphql'

export const UserSignInSchemaArgs = {
  email: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
  password: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
}

export const UserSignUpSchemaArgs = {
  firstName: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
  lastName: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
  email: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
  phone: { type: Graphql.GraphQLString },
  password: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
  passwordConfirm: {
    type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
  },
  birthDate: { type: new Graphql.GraphQLNonNull(Graphql.GraphQLString) },
}
