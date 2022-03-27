import { UserSignInType, UserSignUpType } from '../../user.types'
import knex from '../../../../services/knex'
import bycrpt from 'bcrypt'
import { Knex } from 'knex'
import { errors } from '../../../../services/errors'
import Jwt from 'jsonwebtoken'
import { VerifyToken } from '../../../../services/functions/verifyToken'

type Optional = Pick<Partial<UserSignUpType>, 'password'>
type UserWithoutPassword = Omit<UserSignUpType, 'password'>
type UserWithOptionalPassword = Optional & UserWithoutPassword
export async function logInUser(_: any, args: UserSignInType, ctx: any) {
  // look for provided username in db
  try {
    return await knex.transaction(async (trx: Knex.Transaction<UserSignUpType, UserSignUpType[]>) => {
      const user = await trx('user').where('email', '=', args.email).limit(1).first()
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
      ctx.res.cookie('token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days,
      })
      const _user: UserWithOptionalPassword = user
      delete _user.password
      return _user
    })
  } catch (e: any) {
    console.log(e.message)
    throw new Error(e.message || errors.something_went_wrong)
  }
}
export async function isUserHaveAccessToApp(_: any, args: any, ctx: any) {
  if (VerifyToken(ctx)) {
    return true
  } else {
    return false
  }
}
