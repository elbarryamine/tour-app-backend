import { Knex } from 'knex'
import knex from '../../../../services/knex'
import { TourInterface, TourSearchInterface } from '../../tours.types'
import { errors } from '../../../../services/errors'
import { VerifyIsAdmin, VerifyIsSuperAdmin } from '../../../../services/functions/verifyToken'
import mongoose from 'mongoose'
import { TourModel } from '../../../../model/toursModel'

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
    return new Promise((resolve, _) => {
      knex
        .transaction(async (trx: Knex.Transaction<TourInterface, any[]>) => {
          let query = trx('tour').where('active', '=', '1')
          // if search filter value given we chain query method (fn.method) to check for it
          const withTitle = (fn: any) =>
            fn.where('name', 'like', `%${args.search}%`).orWhere('description', 'like', `%${args.search}%`)
          const withCategory = (fn: any) => fn.where('category', 'like', `%${args.type}%`)
          const withMinPrice = (fn: any) => fn.andWhere('price', '>', args.priceRangeMin)
          const withMaxPrice = (fn: any) => fn.andWhere('price', '<', args.priceRangeMax)
          const withDuration = (fn: any) => fn.andWhere('duration', '=', args.duration)
          if (args.search) query = withTitle(query)
          if (args.type) query = withCategory(query)
          if (args.priceRangeMin) query = withMinPrice(query)
          if (args.priceRangeMax) query = withMaxPrice(query)
          if (args.duration) query = withDuration(query)
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
export async function getInActiveToursResolver(_: any, args: { id?: string }, ctx: any) {
  // super
  try {
    VerifyIsSuperAdmin(ctx)
    return new Promise((resolve, _) => {
      knex
        .transaction(async (trx) => {
          let query = trx('tour').select('*').where('active', '=', '0')
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
export async function getToursOfAnyUserResolver(_: any, args: { id: string }, ctx: any) {
  // super
  try {
    VerifyIsSuperAdmin(ctx)
    return new Promise((resolve, _) => {
      knex
        .transaction(async (trx: Knex.Transaction<TourInterface, TourInterface[]>) => {
          const tours = await trx('tour').select('*').where('createdBy', '=', args.id)
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
export async function getSearchAllToursResolver(_: any, args: TourSearchInterface, ctx: any) {
  try {
    VerifyIsSuperAdmin(ctx)
    return new Promise((resolve, _) => {
      knex
        .transaction(async (trx: Knex.Transaction<TourInterface, any[]>) => {
          let query = trx('tour')
          // if search filter value given we chain query method (fn.method) to check for it
          const withTitle = (fn: any) =>
            fn.where('name', 'like', `%${args.search}%`).orWhere('description', 'like', `%${args.search}%`)
          const withCategory = (fn: any) => fn.where('category', 'like', `%${args.type}%`)
          const withMinPrice = (fn: any) => fn.andWhere('price', '>', args.priceRangeMin)
          const withMaxPrice = (fn: any) => fn.andWhere('price', '<', args.priceRangeMax)
          const withDuration = (fn: any) => fn.andWhere('duration', '=', args.duration)
          if (args.search) query = withTitle(query)
          if (args.type) query = withCategory(query)
          if (args.priceRangeMin) query = withMinPrice(query)
          if (args.priceRangeMax) query = withMaxPrice(query)
          if (args.duration) query = withDuration(query)
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
