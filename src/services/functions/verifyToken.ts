import { errors } from '../errors'
import Jwt from 'jsonwebtoken'
export function VerifyToken(ctx: any) {
  if (ctx.headers.authorization && ctx.headers.authorization.startsWith('Bearer')) {
    const token = ctx.headers.authorization.split(' ')[1]
    const decoded: any = Jwt.verify(token, process.env.PRIVATE_KEY)
    if (decoded) {
      return decoded.id
    } else {
      throw new Error(errors.missing_access_permission)
    }
  } else {
    throw new Error(errors.missing_header_token)
  }
}
