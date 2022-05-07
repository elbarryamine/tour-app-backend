import { Knex } from 'knex'
import knex from '../../../../services/knex'
import { validateTour } from '../../../../services/functions/validate'
import { TourInterface, CreateTourInterface } from '../../types'
import { errors } from '../../../../services/errors'
import { VerifyIsAdmin } from '../../../../services/functions/verifyToken'
import { DeleteTourInterface } from '../../types'

export async function createTourResolver(_: any, args: CreateTourInterface, ctx: any) {
  try {
    // check if have access
    const decoded = VerifyIsAdmin(ctx)
    if (decoded) {
      if (!validateTour(args)) throw new Error(errors.invalid_fields)
      return await knex.transaction(async (trx: Knex.Transaction<TourInterface, TourInterface[]>) => {
        const tourFromDb = await trx.table('tour').where('name', '=', args.name).first()
        if (tourFromDb) throw new Error(errors.tour_with_same_name)
        const dbTour = {
          name: args.name,
          description: args.description,
          discount: args.discount,
          duration: args.duration,
          price: args.price,
          rating: args.rating,
          createdBy: decoded.id,
          mainImage: '',
          location: JSON.stringify(args.location),
          features: JSON.stringify(args.features),
          category: JSON.stringify(args.category),
          images: JSON.stringify(['']),
        }
        await trx('tour')
          .insert(dbTour)
          .catch((e) => {
            throw new Error(errors.something_went_wrong)
          })
        return {
          name: args.name,
          category: args.category,
          rating: args.rating,
          location: args.location,
          duration: args.duration,
          description: args.description,
          features: args.features,
          price: args.price,
          discount: args.discount,
        }
      })
    }
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}

export async function deleteTourResolver(_: any, args: DeleteTourInterface, ctx: any) {
  // check if have access
  try {
    const decoded = VerifyIsAdmin(ctx)
    if (decoded) {
      await knex
        .table('tour')
        .whereIn('id', args.ids)
        .del()
        .catch(() => new Error(errors.something_went_wrong))
      return true
    }
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}
