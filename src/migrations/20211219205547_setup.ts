import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema
		.createTable('user', function (table) {
			table.string('firstName', 255).notNullable();
			table.string('lastName', 255).notNullable();
			table.string('email', 255).notNullable();
			table.string('phone', 255);
			table.string('password', 255).notNullable();
			table.timestamp('birthDate').notNullable();
			table.timestamp('createdAt').defaultTo(knex.fn.now());
			table.string('avatar');
			table.uuid('id').primary();
		})
		.createTable('tour', function (table) {
			table.string('name', 255).notNullable();
			table.integer('rating').notNullable();
			table.string('duration').notNullable();
			table.string('description').notNullable();
			table.string('price').notNullable();
			table.string('discount').notNullable();
			table.string('mainImage').notNullable();
			table.json('images').notNullable();
			table.json('location').notNullable();
			table.json('features').notNullable();
			table.json('category').notNullable();
			table
				.uuid('createdBy')
				.notNullable()
				.references('id')
				.inTable('user')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			table.timestamp('createdAt').defaultTo(knex.fn.now());
			table.uuid('id').primary();
		})
		.createTable('notification', function (table) {
			table.string('title', 255).notNullable();
			table.string('description', 255).notNullable();
			table.string('image').notNullable();
			table.timestamp('createdAt').defaultTo(knex.fn.now());
			table.uuid('id').primary();
		})
		.createTable('booking', function (table) {
			table.string('title', 255).notNullable();
			table
				.uuid('tourId')
				.notNullable()
				.references('id')
				.inTable('tour')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			table.timestamp('startDate');
			table.timestamp('createdAt').defaultTo(knex.fn.now());
			table.uuid('id').primary();
		})
		.createTable('review', function (table) {
			table.enu('rating', [1, 2, 3, 4, 5]).notNullable();
			table.string('description').notNullable();
			table
				.uuid('tourId')
				.notNullable()
				.references('id')
				.inTable('tour')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			table
				.uuid('userId')
				.notNullable()
				.references('id')
				.inTable('user')
				.onUpdate('CASCADE')
				.onDelete('CASCADE');
			table.uuid('id').primary();
		});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema
		.dropTable('user')
		.dropTable('tour')
		.dropTable('notification')
		.dropTable('booking')
		.dropTable('review');
}
