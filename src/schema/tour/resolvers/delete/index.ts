import knex from '../../../../services/knex'
import { DeleteTourInterface } from '../../tours.interfaces'
import { errors } from '../../../../services/errors'
import { VerifyIsAdmin } from '../../../../services/functions/verifyToken'

export async function deleteTourResolver(_: any, args: DeleteTourInterface, ctx: any) {
  // check if have access
  try {
    const decoded = VerifyIsAdmin(ctx)
    if (decoded) {
      await knex
        .table('tour')
        .where('id', '=', args.id)
        .del()
        .catch(() => new Error(errors.something_went_wrong))
      return true
    }
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}
