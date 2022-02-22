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
exports.deleteTourResolver = exports.createTourResolver = void 0;
const knex_1 = __importDefault(require("../../../../services/knex"));
const validate_1 = require("../../../../services/functions/validate");
const errors_1 = require("../../../../services/errors");
const verifyToken_1 = require("../../../../services/functions/verifyToken");
function createTourResolver(_, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // check if have access
            const decoded = (0, verifyToken_1.VerifyIsAdmin)(ctx);
            if (decoded) {
                if (!(0, validate_1.validateTour)(args))
                    throw new Error(errors_1.errors.invalid_fields);
                return yield knex_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    const tourFromDb = yield trx.table('tour').where('name', '=', args.name).first();
                    if (tourFromDb)
                        throw new Error(errors_1.errors.tour_with_same_name);
                    const dbTour = {
                        name: args.name,
                        description: args.description,
                        discount: args.discount,
                        duration: args.duration,
                        price: args.price,
                        rating: args.rating,
                        createdBy: decoded.id,
                        mainImage: '',
                        location: JSON.stringify(args.location),
                        features: JSON.stringify(args.features),
                        category: JSON.stringify(args.category),
                        images: JSON.stringify(['']),
                    };
                    yield trx('tour')
                        .insert(dbTour)
                        .catch((e) => {
                        throw new Error(errors_1.errors.something_went_wrong);
                    });
                    return {
                        name: args.name,
                        category: args.category,
                        rating: args.rating,
                        location: args.location,
                        duration: args.duration,
                        description: args.description,
                        features: args.features,
                        price: args.price,
                        discount: args.discount,
                    };
                }));
            }
        }
        catch (e) {
            throw new Error(e.message || errors_1.errors.something_went_wrong);
        }
    });
}
exports.createTourResolver = createTourResolver;
function deleteTourResolver(_, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        // check if have access
        try {
            const decoded = (0, verifyToken_1.VerifyIsAdmin)(ctx);
            if (decoded) {
                yield knex_1.default
                    .table('tour')
                    .whereIn('id', args.ids)
                    .del()
                    .catch(() => new Error(errors_1.errors.something_went_wrong));
                return true;
            }
        }
        catch (e) {
            throw new Error(e.message || errors_1.errors.something_went_wrong);
        }
    });
}
exports.deleteTourResolver = deleteTourResolver;
