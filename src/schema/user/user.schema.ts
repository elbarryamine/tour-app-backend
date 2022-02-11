import { GraphQLObjectType, GraphQLString } from 'graphql'
import { UserSchemaArgs } from './user.args'

export const UserSchema = new GraphQLObjectType({
  name: 'User',
  fields: () => UserSchemaArgs,
})
