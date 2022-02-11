import * as Graphql from 'graphql'
import { TOUR_SEARCH_ARGS, CREATE_TOUR_ARGS, DELETE_TOUR_ARGS } from './tour/tour.args'
import { createTourResolver, deleteTourResolver, getToursResolver, searchToursResolver } from './tour/resolvers'
import { UserSignInSchemaArgs, UserSignUpSchemaArgs } from './user/user.args'
import { TourSchema, CreateTourSchema } from './tour/tour.schema'
import { logInUser, isUserHaveAccessToApp, signUpUser } from './user/resolvers'
import { UserSchema } from './user/user.schema'

const rootSchema = new Graphql.GraphQLSchema({
  query: new Graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      getTours: {
        type: new Graphql.GraphQLList(TourSchema),
        resolve: getToursResolver,
      },
      searchTour: {
        type: new Graphql.GraphQLList(TourSchema),
        args: TOUR_SEARCH_ARGS,
        resolve: searchToursResolver,
      },
      signIn: {
        type: new Graphql.GraphQLNonNull(UserSchema),
        args: UserSignInSchemaArgs,
        resolve: logInUser,
      },
      verifyUser: {
        type: Graphql.GraphQLBoolean,
        resolve: isUserHaveAccessToApp,
      },
    }),
  }),
  mutation: new Graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      signUp: {
        type: Graphql.GraphQLBoolean,
        args: UserSignUpSchemaArgs,
        resolve: signUpUser,
      },
      createTour: {
        type: CreateTourSchema,
        args: CREATE_TOUR_ARGS,
        resolve: createTourResolver,
      },
      deleteTour: {
        type: Graphql.GraphQLBoolean,
        args: DELETE_TOUR_ARGS,
        resolve: deleteTourResolver,
      },
    }),
  }),
})

export default rootSchema
