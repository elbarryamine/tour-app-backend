import { Knex } from 'knex';
import knex from '../../db';
import { validateTour } from '../../functions/validate';
// import { validateTour } from '../../functions/validate';
import {
	TourArgsInterface,
	TourSearchArgsInterface,
	CreateTourArgsInterface,
} from './tour.types';

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
export async function createTourResolver(
	_: any,
	args: CreateTourArgsInterface
) {
	try {
		if (!validateTour(args)) throw new Error('Invalid tour fileds');
		return new Promise((resolve, _) => {
			knex.transaction(
				async (
					trx: Knex.Transaction<CreateTourArgsInterface, any[]>
				) => {
					const tour = {
						name: args.name,
						description: args.description,
						discount: args.discount,
						duration: args.duration,
						price: args.price,
						rating: args.rating,
						location: JSON.stringify(args.location),
						features: JSON.stringify(args.features),
						category: JSON.stringify(args.category),
						createdBy: '2',
						mainImage: '',
						images: JSON.stringify(['']),
					};
					await trx('tour').insert(tour);
					resolve(tour);
				}
			).catch((err) => {
				throw new Error('Something Went Wrong');
			});
		});
	} catch (e) {
		return [];
	}
}
