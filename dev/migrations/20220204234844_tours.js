exports.up = async function (knex) {
  return knex.schema
    .createTable('user', function (table) {
      table.string('firstName', 255).notNullable()
      table.string('lastName', 255).notNullable()
      table.string('email', 255).unique().notNullable()
      table.string('phone', 255).unique()
      table.string('password', 255).notNullable()
      table.string('roles', 255).notNullable().defaultTo('none')
      table.timestamp('birthDate').notNullable()
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.string('avatar')
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    })
    .createTable('tour', function (table) {
      table.string('name', 255).notNullable()
      table.integer('rating').notNullable()
      table.string('duration').notNullable()
      table.string('description').notNullable()
      table.integer('price').notNullable()
      table.integer('discount').notNullable()
      table.string('mainImage').notNullable()
      table.json('images').notNullable()
      table.json('location').notNullable()
      table.json('features').notNullable()
      table.json('category').notNullable()
      table.uuid('createdBy').notNullable().references('id').inTable('user').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    })
    .createTable('notification', function (table) {
      table.string('title', 255).notNullable()
      table.string('description', 255).notNullable()
      table.string('image').notNullable()
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    })
    .createTable('booking', function (table) {
      table.string('title', 255).notNullable()
      table.uuid('tourId').notNullable().references('id').inTable('tour').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamp('startDate')
      table.timestamp('createdAt').defaultTo(knex.fn.now())
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    })
    .createTable('review', function (table) {
      table.enu('rating', [1, 2, 3, 4, 5]).notNullable()
      table.string('description').notNullable()
      table.uuid('tourId').notNullable().references('id').inTable('tour').onUpdate('CASCADE').onDelete('CASCADE')
      table.uuid('userId').notNullable().references('id').inTable('user').onUpdate('CASCADE').onDelete('CASCADE')
      table.uuid('id').primary().defaultTo(knex.raw('(UUID())'))
    })
}

exports.down = async function (knex) {
  return knex.schema
    .dropTable('user')
    .dropTable('tour')
    .dropTable('notification')
    .dropTable('booking')
    .dropTable('review')
}
