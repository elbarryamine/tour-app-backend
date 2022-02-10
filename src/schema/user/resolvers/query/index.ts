import { UserSignInType, UserSignUpType } from '../../user.types'
import knex from '../../../../services/knex'
import bycrpt from 'bcrypt'
import { Knex } from 'knex'
import { errors } from '../../../../services/errors'
import Jwt from 'jsonwebtoken'
import { VerifyTokenString } from '../../../../services/functions/verifyToken'

export async function logInUser(_: any, args: UserSignInType, ctx: any) {
  // look for provided username in db
  try {
    return await knex.transaction(async (trx: Knex.Transaction<UserSignUpType, UserSignUpType[]>) => {
      const user = await trx('user').where('email', '=', args.email).first()
      if (!user) {
        throw new Error(errors.wrong_email_or_password)
      }
      const isValidPassword = await bycrpt.compare(args.password, user.password)
      if (!isValidPassword) {
        throw new Error(errors.wrong_email_or_password)
      }
      const accessToken = Jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, {
        expiresIn: '3d',
      })
      return accessToken
    })
  } catch (e: any) {
    console.log(e.message)
    throw new Error(e.message || errors.something_went_wrong)
  }
}
export async function isUserHaveAccessToApp(_: any, args: { token: string }) {
  VerifyTokenString(args.token)
  return true
}
