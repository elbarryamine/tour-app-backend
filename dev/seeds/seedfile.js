const faker = require('faker');

exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('user').del();
	await knex('tour').del();
	// await knex('notification').del();
	// await knex('booking').del();
	// await knex('review').del();
	// Inserts seed entries
	let seedsUser = [];
	for (let i = 0; i < 10; i++) {
		seedsUser.push({
			id: i,
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			phone: faker.phone.phoneNumber(),
			password: faker.random.words(),
			birthDate: faker.date
				.past(5)
				.toISOString()
				.slice(0, 19)
				.replace('T', ' '),
			avatar: faker.random.image(),
		});
	}
	await knex('user').insert(seedsUser);
	let seedsTour = [];
	for (let i = 0; i < 10; i++) {
		seedsTour.push({
			name: faker.name.title(),
			rating: faker.datatype.number({ min: 1, max: 5 }),
			duration: faker.datatype.string(),
			description: faker.lorem.words(),
			price: faker.datatype.number(),
			discount: faker.datatype.number(),
			mainImage: faker.random.words(),
			images: JSON.stringify([
				faker.random.image(),
				faker.random.image(),
				faker.random.image(),
			]),
			location: JSON.stringify([
				faker.address.city(),
				faker.address.city(),
				faker.address.city(),
			]),
			features: JSON.stringify([
				faker.random.word(),
				faker.random.word(),
				faker.random.word(),
			]),
			category: JSON.stringify([
				faker.random.word(),
				faker.random.word(),
				faker.random.word(),
			]),
			createdBy: i,
		});
	}
	await knex('tour').insert(seedsTour);
};
