"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .createTable('user', function (table) {
            table.string('firstName', 255).notNullable();
            table.string('lastName', 255).notNullable();
            table.string('email', 255).unique().notNullable();
            table.string('phone', 255).unique();
            table.string('password', 255).notNullable();
            table.string('role', 255).notNullable().defaultTo('user');
            table.timestamp('birthDate').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.string('avatar');
            table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
        })
            .createTable('tour', function (table) {
            table.string('name', 255).notNullable();
            table.enum('rating', [1, 2, 3, 4, 5]).notNullable();
            table.integer('numberOfbooked').defaultTo(0);
            table.enu('active', ['0', '1']).defaultTo('0');
            table.decimal('duration').notNullable();
            table.string('description').notNullable();
            table.integer('price').notNullable();
            table.integer('discount').notNullable();
            table.string('mainImage').notNullable();
            table.json('images').notNullable();
            table.json('location').notNullable();
            table.json('features').notNullable();
            table.json('category').notNullable();
            table.uuid('createdBy').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
        })
            .createTable('notification', function (table) {
            table.string('title', 255).notNullable();
            table.string('description', 255).notNullable();
            table.string('image').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
        })
            .createTable('booking', function (table) {
            table.string('title', 255).notNullable();
            table.string('userLocation', 255).notNullable();
            table.uuid('tourId').notNullable();
            table.timestamp('startDate');
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
            table.string('user');
        })
            .createTable('review', function (table) {
            table.enu('rating', [1, 2, 3, 4, 5]).notNullable();
            table.string('description').notNullable();
            table.uuid('tourId').notNullable();
            table.uuid('userId').notNullable();
            table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .dropTable('user')
            .dropTable('tour')
            .dropTable('notification')
            .dropTable('booking')
            .dropTable('review');
    });
}
exports.down = down;
