import knex from '../../db';
import { validateTour } from '../../functions/validate';
import { TourInterface } from './tour.types';

export async function createTourResolver(
	parents: any,
	args: TourInterface,
	ctx: any
) {
	if (validateTour(args)) {
		knex
			.transaction(async (trx) => {
				trx('tour').insert({ ...args });
			})
			.catch(() => {
				throw new Error('Something Went Wrong');
			});
		return true;
	} else {
		throw new Error('Invalid Data');
	}
}
export async function getToursResolver(
	parents: any,
	args: TourInterface,
	ctx: any
) {
	try {
		return new Promise((resolve, _) => {
			knex
				.transaction(async (trx) => {
					const tours = await trx('tour').select('*');
					resolve(tours);
				})
				.catch((err) => {
					throw new Error('Something Went Wrong');
				});
		});
	} catch (e) {
		return [];
	}
}

export async function updateTour(_: never, args: TourInterface) {
	knex.transaction((trx) => {
		// trx("tour")
	});
}
