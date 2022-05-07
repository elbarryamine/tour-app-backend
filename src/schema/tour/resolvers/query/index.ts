import { Knex } from 'knex'
import knex from '../../../../services/knex'
import { GetTourByUserIdInterface, TourInterface, TourSearchInterface } from '../../types'
import { errors } from '../../../../services/errors'
import { VerifyIsAdmin, VerifyIsSuperAdmin } from '../../../../services/functions/verifyToken'
import mongoose from 'mongoose'
import { TourModel, TourType } from '../../../../model/toursModel'

// User Access
export async function getToursResolver() {
  try {
    return await TourModel.find({})
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}

export async function getPopularToursResolver() {}

export async function getLatestToursResolver() {
  try {
    return await TourModel.find({}).limit(10).sort({ createdAt: 1 })
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}
export async function searchToursResolver(_: any, args: TourSearchInterface) {
  try {
    const query: mongoose.FilterQuery<TourType> = { active: 0 }
    query['price'] = {}
    if (args.search)
      query['$or'] = [{ name: { $regex: `.*${args.search}.*` } }, { description: { $regex: `.*${args.search}.*` } }]
    if (args.type) query['category'] = { $regex: `.*${args.type}*.` }
    if (args.priceRangeMin) query['price'] = { ...query['price'], $gt: args.priceRangeMin }
    if (args.priceRangeMax) query['price'] = { ...query['price'], $lt: args.priceRangeMax }
    if (args.duration) query['duration'] = args.duration
    return await TourModel.find(query)
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}

// Admin Access
export async function getToursCreatedByAdminResolver(_: any, args: { id: string }, ctx: any) {
  try {
    const decoded = VerifyIsAdmin(ctx)
    return new Promise((resolve, _) => {
      knex
        .transaction(async (trx: Knex.Transaction<TourInterface, TourInterface[]>) => {
          const tours = await trx('tour').select('*').where('createdBy', '=', decoded.id)
          resolve(tours)
        })
        .catch((err) => {
          throw new Error(errors.something_went_wrong)
        })
    })
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}

//Super Access

export async function getActiveToursResolver(_: any, args: { id?: string }, ctx: any) {
  // super
  try {
    VerifyIsSuperAdmin(ctx)
    return new Promise((resolve, _) => {
      knex
        .transaction(async (trx) => {
          let query = trx('tour').select('*').where('active', '=', '1')
          const withId = (fn: any) => fn.where('id', '=', args.id)
          if (args.id) {
            query = withId(query)
          }
          const tours = await query
          resolve(tours)
        })
        .catch((err) => {
          throw new Error(errors.something_went_wrong)
        })
    })
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}
export async function getInActiveToursResolver() {
  // super
  try {
    // VerifyIsSuperAdmin(ctx)
    return await TourModel.find({ active: 0 })
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}
export async function getToursOfAnyUserResolver(_: any, args: GetTourByUserIdInterface, ctx: any) {
  // super
  try {
    // VerifyIsSuperAdmin(ctx)
    return await TourModel.find({ createdBy: args.id })
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}
export async function getSearchAllToursResolver(_: any, args: TourSearchInterface, ctx: any) {
  try {
    VerifyIsSuperAdmin(ctx)
    try {
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
      throw new Error(e.message || errors.something_went_wrong)
    }
  } catch (e: any) {
    throw new Error(e.message || errors.something_went_wrong)
  }
}
