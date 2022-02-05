import { Knex } from 'knex';
import knex from '../../db';
// import { validateTour } from '../../functions/validate';
import { TourArgsInterface, TourSearchArgsInterface } from './tour.types';

export async function getToursResolver() {
	try {
		return new Promise((resolve, _) => {
			knex.transaction(async (trx) => {
				const tours = await trx('tour').select('*');
				resolve(tours);
			}).catch((err) => {
				throw new Error('Something Went Wrong');
			});
		});
	} catch (e) {
		return [];
	}
}
export async function searchToursResolver(
	_: any,
	args: TourSearchArgsInterface
) {
	try {
		return new Promise((resolve, _) => {
			knex.transaction(
				async (trx: Knex.Transaction<TourArgsInterface, any[]>) => {
					let query = trx('tour');
					// if search filter value given we chain query method (fn.method) to check for it
					const withTitle = (fn: any) =>
						fn
							.where('name', 'like', `%${args.search}%`)
							.orWhere('description', 'like', `%${args.search}%`);
					const withCategory = (fn: any) =>
						fn.where('category', 'like', `%${args.type}%`);
					const withMinPrice = (fn: any) =>
						fn.andWhere('price', '>', args.priceRangeMin);
					const withMaxPrice = (fn: any) =>
						fn.andWhere('price', '<', args.priceRangeMax);
					const withDuration = (fn: any) =>
						fn.andWhere('duration', '=', args.duration);
					if (args.search) query = withTitle(query);
					if (args.type) query = withCategory(query);
					if (args.priceRangeMin) query = withMinPrice(query);
					if (args.priceRangeMax) query = withMaxPrice(query);
					if (args.duration) query = withDuration(query);
					const tours = await query;
					resolve(tours);
				}
			).catch((err) => {
				throw new Error('Something Went Wrong');
			});
		});
	} catch (e) {
		return [];
	}
}

export async function updateTour(_: never, args: TourArgsInterface) {
	knex.transaction((trx) => {
		// trx("tour")
	});
}
