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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchAllToursResolver = exports.getToursOfAnyUserResolver = exports.getInActiveToursResolver = exports.getActiveToursResolver = exports.getToursCreatedByAdminResolver = exports.searchToursResolver = exports.getLatestToursResolver = exports.getPopularToursResolver = exports.getToursResolver = void 0;
const knex_1 = __importDefault(require("../../../../services/knex"));
const errors_1 = require("../../../../services/errors");
const verifyToken_1 = require("../../../../services/functions/verifyToken");
// User Access
function getToursResolver() {
    return __awaiter(this, void 0, void 0, function* () {
        // user
        try {
            return new Promise((resolve, _) => {
                knex_1.default
                    .transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    const tours = yield trx('tour').select('*');
                    // .where('active', '=', '1')
                    resolve(tours);
                }))
                    .catch((err) => {
                    throw new Error(errors_1.errors.something_went_wrong);
                });
            });
        }
        catch (e) {
            throw new Error(e.message || errors_1.errors.something_went_wrong);
        }
    });
}
exports.getToursResolver = getToursResolver;
function getPopularToursResolver() {
    return __awaiter(this, void 0, void 0, function* () {
        // user
        try {
            return new Promise((resolve, _) => {
                knex_1.default
                    .transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    const tours = yield trx('tour').select('*').where('active', '=', '1');
                    resolve(tours);
                }))
                    .catch((err) => {
                    throw new Error(errors_1.errors.something_went_wrong);
                });
            });
        }
        catch (e) {
            throw new Error(e.message || errors_1.errors.something_went_wrong);
        }
    });
}
exports.getPopularToursResolver = getPopularToursResolver;
function getLatestToursResolver() {
    return __awaiter(this, void 0, void 0, function* () {
        // user
        try {
            return new Promise((resolve, _) => {
                knex_1.default
                    .transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    const tours = yield trx('tour').select('*').where('active', '=', '1').orderBy('createdAt');
                    resolve(tours);
                }))
                    .catch((err) => {
                    throw new Error(errors_1.errors.something_went_wrong);
                });
            });
        }
        catch (e) {
            throw new Error(e.message || errors_1.errors.something_went_wrong);
        }
    });
}
exports.getLatestToursResolver = getLatestToursResolver;
function searchToursResolver(_, args) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return new Promise((resolve, _) => {
                knex_1.default
                    .transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    let query = trx('tour').where('active', '=', '1');
                    // if search filter value given we chain query method (fn.method) to check for it
                    const withTitle = (fn) => fn.where('name', 'like', `%${args.search}%`).orWhere('description', 'like', `%${args.search}%`);
                    const withCategory = (fn) => fn.where('category', 'like', `%${args.type}%`);
                    const withMinPrice = (fn) => fn.andWhere('price', '>', args.priceRangeMin);
                    const withMaxPrice = (fn) => fn.andWhere('price', '<', args.priceRangeMax);
                    const withDuration = (fn) => fn.andWhere('duration', '=', args.duration);
                    if (args.search)
                        query = withTitle(query);
                    if (args.type)
                        query = withCategory(query);
                    if (args.priceRangeMin)
                        query = withMinPrice(query);
                    if (args.priceRangeMax)
                        query = withMaxPrice(query);
                    if (args.duration)
                        query = withDuration(query);
                    const tours = yield query;
                    resolve(tours);
                }))
                    .catch((err) => {
                    throw new Error(errors_1.errors.something_went_wrong);
                });
            });
        }
        catch (e) {
            throw new Error(e.message || errors_1.errors.something_went_wrong);
        }
    });
}
exports.searchToursResolver = searchToursResolver;
// Admin Access
function getToursCreatedByAdminResolver(_, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decoded = (0, verifyToken_1.VerifyIsAdmin)(ctx);
            return new Promise((resolve, _) => {
                knex_1.default
                    .transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    const tours = yield trx('tour').select('*').where('createdBy', '=', decoded.id);
                    resolve(tours);
                }))
                    .catch((err) => {
                    throw new Error(errors_1.errors.something_went_wrong);
                });
            });
        }
        catch (e) {
            throw new Error(e.message || errors_1.errors.something_went_wrong);
        }
    });
}
exports.getToursCreatedByAdminResolver = getToursCreatedByAdminResolver;
//Super Access
function getActiveToursResolver(_, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        // super
        try {
            (0, verifyToken_1.VerifyIsSuperAdmin)(ctx);
            return new Promise((resolve, _) => {
                knex_1.default
                    .transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    let query = trx('tour').select('*').where('active', '=', '1');
                    const withId = (fn) => fn.where('id', '=', args.id);
                    if (args.id) {
                        query = withId(query);
                    }
                    const tours = yield query;
                    resolve(tours);
                }))
                    .catch((err) => {
                    throw new Error(errors_1.errors.something_went_wrong);
                });
            });
        }
        catch (e) {
            throw new Error(e.message || errors_1.errors.something_went_wrong);
        }
    });
}
exports.getActiveToursResolver = getActiveToursResolver;
function getInActiveToursResolver(_, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        // super
        try {
            (0, verifyToken_1.VerifyIsSuperAdmin)(ctx);
            return new Promise((resolve, _) => {
                knex_1.default
                    .transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    let query = trx('tour').select('*').where('active', '=', '0');
                    const withId = (fn) => fn.where('id', '=', args.id);
                    if (args.id) {
                        query = withId(query);
                    }
                    const tours = yield query;
                    resolve(tours);
                }))
                    .catch((err) => {
                    throw new Error(errors_1.errors.something_went_wrong);
                });
            });
        }
        catch (e) {
            throw new Error(e.message || errors_1.errors.something_went_wrong);
        }
    });
}
exports.getInActiveToursResolver = getInActiveToursResolver;
function getToursOfAnyUserResolver(_, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        // super
        try {
            (0, verifyToken_1.VerifyIsSuperAdmin)(ctx);
            return new Promise((resolve, _) => {
                knex_1.default
                    .transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    const tours = yield trx('tour').select('*').where('createdBy', '=', args.id);
                    resolve(tours);
                }))
                    .catch((err) => {
                    throw new Error(errors_1.errors.something_went_wrong);
                });
            });
        }
        catch (e) {
            throw new Error(e.message || errors_1.errors.something_went_wrong);
        }
    });
}
exports.getToursOfAnyUserResolver = getToursOfAnyUserResolver;
function getSearchAllToursResolver(_, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, verifyToken_1.VerifyIsSuperAdmin)(ctx);
            return new Promise((resolve, _) => {
                knex_1.default
                    .transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    let query = trx('tour');
                    // if search filter value given we chain query method (fn.method) to check for it
                    const withTitle = (fn) => fn.where('name', 'like', `%${args.search}%`).orWhere('description', 'like', `%${args.search}%`);
                    const withCategory = (fn) => fn.where('category', 'like', `%${args.type}%`);
                    const withMinPrice = (fn) => fn.andWhere('price', '>', args.priceRangeMin);
                    const withMaxPrice = (fn) => fn.andWhere('price', '<', args.priceRangeMax);
                    const withDuration = (fn) => fn.andWhere('duration', '=', args.duration);
                    if (args.search)
                        query = withTitle(query);
                    if (args.type)
                        query = withCategory(query);
                    if (args.priceRangeMin)
                        query = withMinPrice(query);
                    if (args.priceRangeMax)
                        query = withMaxPrice(query);
                    if (args.duration)
                        query = withDuration(query);
                    const tours = yield query;
                    resolve(tours);
                }))
                    .catch((err) => {
                    throw new Error(errors_1.errors.something_went_wrong);
                });
            });
        }
        catch (e) {
            throw new Error(e.message || errors_1.errors.something_went_wrong);
        }
    });
}
exports.getSearchAllToursResolver = getSearchAllToursResolver;
