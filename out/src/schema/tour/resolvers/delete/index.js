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
exports.deleteTourResolver = void 0;
const knex_1 = __importDefault(require("../../../../services/knex"));
const errors_1 = require("../../../../services/errors");
const verifyToken_1 = require("../../../../services/functions/verifyToken");
function deleteTourResolver(_, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        // check if have access
        try {
            const decoded = (0, verifyToken_1.VerifyIsAdmin)(ctx);
            if (decoded) {
                yield knex_1.default
                    .table('tour')
                    .where('id', '=', args.id)
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
