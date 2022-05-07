import { GetTourByUserIdInterface, TourSearchInterface } from './types'
import { errors } from '../../helpers/error-handing/errors'
import { VerifyIsSuperAdmin } from '../../helpers/validation/verify-token'
import mongoose from 'mongoose'
import { TourModel, TourType } from '../../model/tours-model'

// User Access
export async function getToursResolver() {
  try {
    return await TourModel.find({ active: 1 })
  } catch (e: any) {
    throw new Error(errors.something_went_wrong)
  }
}

export async function getPopularToursResolver() {}

export async function getLatestToursResolver() {
  try {
    return await TourModel.find({ active: 1 }).limit(10).sort({ createdAt: 1 })
  } catch (e: any) {
    throw new Error(errors.something_went_wrong)
  }
}

export async function searchToursResolver(_: any, args: TourSearchInterface) {
  try {
    const query: mongoose.FilterQuery<TourType> = { active: 1 }
    query['price'] = {}
    if (args.search)
      query['$or'] = [{ name: { $regex: `.*${args.search}.*` } }, { description: { $regex: `.*${args.search}.*` } }]
    if (args.type) query['category'] = { $regex: `.*${args.type}*.` }
    if (args.priceRangeMin) query['price'] = { ...query['price'], $gte: args.priceRangeMin }
    if (args.priceRangeMax) query['price'] = { ...query['price'], $lte: args.priceRangeMax }
    if (args.duration) query['duration'] = args.duration
    return await TourModel.find(query)
  } catch (e: any) {
    throw new Error(errors.something_went_wrong)
  }
}

export async function getInActiveToursResolver(_: any, args: any, ctx: any) {
  try {
    VerifyIsSuperAdmin(ctx)
    return await TourModel.find({ active: 0 })
  } catch (e: any) {
    throw new Error(errors.something_went_wrong)
  }
}

export async function getToursOfAnyUserResolver(_: any, args: GetTourByUserIdInterface, ctx: any) {
  try {
    VerifyIsSuperAdmin(ctx)
    return await TourModel.find({ createdBy: args.id })
  } catch (e: any) {
    throw new Error(errors.something_went_wrong)
  }
}

export async function getSearchAllToursResolver(_: any, args: TourSearchInterface, ctx: any) {
  try {
    VerifyIsSuperAdmin(ctx)
    const query: mongoose.FilterQuery<TourType> = {}
    query['price'] = {}
    if (args.search)
      query['$or'] = [{ name: { $regex: `.*${args.search}.*` } }, { description: { $regex: `.*${args.search}.*` } }]
    if (args.type) query['category'] = { $regex: `.*${args.type}*.` }
    if (args.priceRangeMin) query['price'] = { ...query['price'], $gt: args.priceRangeMin }
    if (args.priceRangeMax) query['price'] = { ...query['price'], $lt: args.priceRangeMax }
    if (args.duration) query['duration'] = args.duration
    return await TourModel.find(query)
  } catch (e: any) {
    throw new Error(errors.something_went_wrong)
  }
}
