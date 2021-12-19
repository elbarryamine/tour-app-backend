import knex from '../../db';
export async function createTourResolver(parents: any, args: any, ctx: any) {
	return false;
}
export async function getToursResolver(parents: any, args: any, ctx: any) {
	try {
		const tours = await knex('tour').select('*');
		return tours;
	} catch (e) {
		console.log(e);
		return [];
	}
}
