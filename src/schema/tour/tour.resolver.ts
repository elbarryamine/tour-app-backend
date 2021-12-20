import knex from '../../db';
import { validateTour } from '../../functions/validate';
export async function createTourResolver(parents: any, args: any, ctx: any) {
	if (validateTour(args)) {
		return true;
	} else {
		return false;
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
					console.error(err);
					throw err;
				});
		});
	} catch (e) {
		return [];
	}
}
