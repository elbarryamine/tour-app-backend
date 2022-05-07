import * as Graphql from 'graphql'
import { UserSchemaArgs, UserSignInSchemaArgs, UserSignUpSchemaArgs } from './args'
import { logInUser, isUserHaveAccessToApp } from './query'
import { signUpUser } from './mutation'

const UserSchema = new Graphql.GraphQLObjectType({
  name: 'User',
  fields: () => UserSchemaArgs,
})

export const userQuery: Graphql.ThunkObjMap<Graphql.GraphQLFieldConfig<any, any, any>> = {
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
export const userMutation: Graphql.ThunkObjMap<Graphql.GraphQLFieldConfig<any, any, any>> = {
  signUp: {
    type: UserSchema,
    args: UserSignUpSchemaArgs,
    resolve: signUpUser,
  },
}
