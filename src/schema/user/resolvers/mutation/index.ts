import { UserSignUpType } from '../../types'
import knex from '../../../../services/knex'
import { validateUserSignUp } from '../../../../services/functions/validate'
import bycrpt from 'bcrypt'
import { errors } from '../../../../services/errors'

type PropertiesOptional = Pick<Partial<UserSignUpType>, 'passwordConfirm'>
type WithoutPassConfirm = Omit<UserSignUpType, 'passwordConfirm'>
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
    await knex('user')
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
