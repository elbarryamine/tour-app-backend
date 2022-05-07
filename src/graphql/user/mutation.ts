import { UserSignUpType } from './types'
import { validateUserSignUp } from '../../helpers/validation/validate'
import bycrpt from 'bcrypt'
import { errors } from '../../helpers/error-handing/errors'
import { UsersModel } from '../../model/users-model'

type PropertiesOptional = Pick<Partial<UserSignUpType>, 'passwordConfirm'>
type WithoutPassConfirm = Omit<UserSignUpType, 'passwordConfirm'>
type FormData = PropertiesOptional & WithoutPassConfirm

export async function signUpUser(_: any, args: UserSignUpType, ctx: any) {
  try {
    if (!validateUserSignUp(args) || args.password !== args.passwordConfirm) {
      throw new Error(errors.invalid_fields)
    }
    await UsersModel.findOne({ $or: [{ email: args.email }, { phone: args.phone }] }).then((userDoc) => {
      if (userDoc) {
        const isUserHasSameEmail = userDoc.email === args.email ? true : false
        const isUserHasSamePhone = userDoc.phone === args.phone ? true : false

        if (isUserHasSameEmail) {
          throw new Error(errors.user_with_same_email_exist)
        }

        if (isUserHasSamePhone) {
          throw new Error(errors.user_with_same_phone_exist)
        }
      }
    })

    const user: FormData = { ...args }
    delete user.passwordConfirm
    const hashedPassword = await bycrpt.hash(user.password, 10)

    const userDoc = new UsersModel({ ...user, password: hashedPassword })
    const _user = await userDoc.save()

    return _user
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}
