import { UserSignInType, UserSignUpType } from './types'
import bycrpt from 'bcrypt'
import { errors } from '../../helpers/error-handing/errors'
import Jwt from 'jsonwebtoken'
import { VerifyToken } from '../../helpers/validation/verify-token'
import { UsersModel } from '../../model/users-model'

type Optional = Pick<Partial<UserSignUpType>, 'password'>
type UserWithoutPassword = Omit<UserSignUpType, 'password'>
type UserWithOptionalPassword = Optional & UserWithoutPassword
export async function logInUser(_: any, args: UserSignInType, ctx: any) {
  // look for provided username in db
  try {
    const user = await UsersModel.findOne({ email: args.email })
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
  } catch (e: any) {
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
