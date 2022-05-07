import { errors } from '../errors'
import Jwt from 'jsonwebtoken'
import knex from '../../services/knex'
import { Knex } from 'knex'
import { UserRole, UserSignUpType } from '../../schema/user/types'
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
type UserWithRole = UserSignUpType & UserRole

export function VerifyIsAdmin(ctx: any): { id: string } {
  const decoded = VerifyToken(ctx)
  knex.transaction(async function (trx: Knex.Transaction<UserWithRole, UserWithRole[]>) {
    const user = await trx('user').where('id', '=', decoded.id).first()
    if (!user) throw new Error(errors.something_went_wrong)
    if (user.role !== 'admin' && user.role !== 'super') throw new Error(errors.missing_access_permission)
  })
  return decoded
}

export function VerifyIsSuperAdmin(ctx: any): { id: string } {
  const decoded = VerifyToken(ctx)
  knex.transaction(async function (trx: Knex.Transaction<UserWithRole, UserWithRole[]>) {
    const user = await trx('user').where('id', '=', decoded.id).first()
    if (!user) throw new Error(errors.something_went_wrong)
    if (user.role !== 'super') throw new Error(errors.missing_access_permission)
  })
  return decoded
}
