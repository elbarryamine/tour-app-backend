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
exports.updateTour = exports.searchToursResolver = exports.getToursResolver = void 0;
const db_1 = __importDefault(require("../../db"));
function getToursResolver() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return new Promise((resolve, _) => {
                db_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    const tours = yield trx('tour').select('*');
                    resolve(tours);
                })).catch((err) => {
                    throw new Error('Something Went Wrong');
                });
            });
        }
        catch (e) {
            return [];
        }
    });
}
exports.getToursResolver = getToursResolver;
function searchToursResolver(_, args) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return new Promise((resolve, _) => {
                db_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    let query = trx('tour');
                    // if search filter value given we chain query method (fn.method) to check for it
                    const withTitle = (fn) => fn
                        .where('name', 'like', `%${args.search}%`)
                        .orWhere('description', 'like', `%${args.search}%`);
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
                })).catch((err) => {
                    throw new Error('Something Went Wrong');
                });
            });
        }
        catch (e) {
            return [];
        }
    });
}
exports.searchToursResolver = searchToursResolver;
function updateTour(_, args) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.default.transaction((trx) => {
            // trx("tour")
        });
    });
}
exports.updateTour = updateTour;
