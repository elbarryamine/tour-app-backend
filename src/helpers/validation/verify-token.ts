import { errors } from '../error-handing/errors'
import Jwt from 'jsonwebtoken'
import { UsersModel } from '../../model/users-model'
export function VerifyToken(ctx: any): { id: string } {
  if (ctx.cookies.token) {
    const token = ctx.cookies.token
    const decoded: any = Jwt.verify(token, process.env.PRIVATE_KEY)
    if (decoded) {
      return decoded.id
    } else {
      throw new Error(errors.missing_access_permission)
    }
  } else {
    throw new Error(errors.missing_token)
  }
}

export function VerifyIsAdmin(ctx: any): { id: string } {
  const decoded = VerifyToken(ctx)
  UsersModel.findOne({ id: decoded.id }).then((user) => {
    if (!user) throw new Error(errors.something_went_wrong)
    if (user.role !== 'admin' && user.role !== 'super') throw new Error(errors.missing_access_permission)
  })
  return decoded
}

export function VerifyIsSuperAdmin(ctx: any): { id: string } {
  const decoded = VerifyToken(ctx)
  UsersModel.findOne({ id: decoded.id }).then((user) => {
    if (!user) throw new Error(errors.something_went_wrong)
    if (user.role !== 'super') throw new Error(errors.missing_access_permission)
  })
  return decoded
}
