import * as Graphql from 'graphql'
import { tourMutation, tourQuery } from './tour/schema'
import { userMutation, userQuery } from './user/schema'

const Schema = new Graphql.GraphQLSchema({
  query: new Graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...tourQuery,
      ...userQuery,
    }),
  }),
  mutation: new Graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...tourMutation,
      ...userMutation,
    }),
  }),
})

export default Schema
