import * as Graphql from 'graphql'
import { UserSchemaArgs, UserSignInSchemaArgs, UserSignUpSchemaArgs } from './args'
import { logInUser, isUserHaveAccessToApp, signUpUser } from './resolvers'

const UserSchema = new Graphql.GraphQLObjectType({
  name: 'User',
  fields: () => UserSchemaArgs,
})

export const userQuery = {
  signIn: {
    type: new Graphql.GraphQLNonNull(UserSchema),
    args: UserSignInSchemaArgs,
    resolve: logInUser,
  },
  verifyUser: {
    type: Graphql.GraphQLBoolean,
    resolve: isUserHaveAccessToApp,
  },
}
export const userMutation = {
  signUp: {
    type: Graphql.GraphQLBoolean,
    args: UserSignUpSchemaArgs,
    resolve: signUpUser,
  },
}
