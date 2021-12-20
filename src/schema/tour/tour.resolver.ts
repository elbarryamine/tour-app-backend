import knex from '../../db';
import { validateTour } from '../../functions/validate';
import { tourArgs } from './tour.types';
type TypeTourArgs = typeof tourArgs;
export async function createTourResolver(
	parents: any,
	args: TypeTourArgs,
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
export async function getToursResolver(parents: any, args: any, ctx: any) {
	try {
		return new Promise((resolve, reject) => {
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
