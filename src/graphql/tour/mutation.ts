import { validateTour } from '../../helpers/validation/validate'
import { CreateTourInterface } from './types'
import { errors } from '../../helpers/error-handing/errors'
import { VerifyIsAdmin } from '../../helpers/validation/verify-token'
import { DeleteTourInterface } from './types'
import { TourModel } from '../../model/tours-model'

export async function createTourResolver(_: any, args: CreateTourInterface, ctx: any) {
  try {
    // check if have access
    const decoded = VerifyIsAdmin(ctx)
    if (!validateTour(args)) throw new Error(errors.invalid_fields)
    const tourFromDb = await TourModel.findOne({ name: args.name })
    if (tourFromDb) throw new Error(errors.tour_with_same_name)
    const tour = new TourModel({
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
    })
    await tour.save()
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
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}

export async function deleteTourResolver(_: any, args: DeleteTourInterface, ctx: any) {
  // check if have access
  try {
    const decoded = VerifyIsAdmin(ctx)
    if (decoded) {
      await TourModel.deleteMany({ _id: args.ids })
      return true
    }
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}
