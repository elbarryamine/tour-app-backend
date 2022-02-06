import { UserSignInType, UserSignUpType } from './user.interfaces'
import knex from '../../services/knex'
import { validateUserSignUp } from '../../services/functions/validate'
import bycrpt from 'bcrypt'
import { Knex } from 'knex'
import { errors } from '../../services/errors'
import Jwt from 'jsonwebtoken'

type PropertiesOptional = Pick<Partial<UserSignUpType>, 'passwordConfirm'>
type WithoutPassConfirm = Omit<UserSignInType, 'passwordConfirm'>
type FormData = PropertiesOptional & WithoutPassConfirm

export async function signUpUser(_: any, args: UserSignUpType, ctx: any) {
  try {
    if (!validateUserSignUp(args) || args.password !== args.passwordConfirm) {
      throw new Error(errors.invalid_fields)
    }
    const userInDb = await knex('user')
      .where('email', '=', args.email)
      .orWhere('phone', '=', args.phone)
      .first()
      .catch((err) => {
        throw new Error(err)
      })
    if (userInDb) {
      const isUserHasSameEmail = userInDb.email === args.email ? true : false
      const isUserHasSamePhone = userInDb.phone === args.phone ? true : false
      if (isUserHasSameEmail) {
        throw new Error(errors.user_with_same_email_exist)
      }
      if (isUserHasSamePhone) {
        throw new Error(errors.user_with_same_phone_exist)
      }
    }
    const user: FormData = { ...args }
    delete user.passwordConfirm
    const hashedPassword = await bycrpt.hash(user.password, 10)
    knex('user')
      .insert({
        ...user,
        avatar: '',
        password: hashedPassword,
      })
      .catch((err) => {
        throw new Error(err)
      })
    return true
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}
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
    throw new Error(e.message || errors.something_went_wrong)
  }
}
async function isUserHaveAccessToApp(_: any, args: { token: string }) {}
