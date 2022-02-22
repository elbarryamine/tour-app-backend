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
exports.VerifyIsSuperAdmin = exports.VerifyIsAdmin = exports.VerifyToken = void 0;
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const knex_1 = __importDefault(require("../../services/knex"));
function VerifyToken(ctx) {
    if (ctx.cookies.token) {
        const token = ctx.cookies.token;
        const decoded = jsonwebtoken_1.default.verify(token, process.env.PRIVATE_KEY);
        if (decoded) {
            return decoded.id;
        }
        else {
            throw new Error(errors_1.errors.missing_access_permission);
        }
    }
    else {
        throw new Error(errors_1.errors.missing_token);
    }
}
exports.VerifyToken = VerifyToken;
function VerifyIsAdmin(ctx) {
    const decoded = VerifyToken(ctx);
    knex_1.default.transaction(function (trx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield trx('user').where('id', '=', decoded.id).first();
            if (!user)
                throw new Error(errors_1.errors.something_went_wrong);
            if (user.role !== 'admin' && user.role !== 'super')
                throw new Error(errors_1.errors.missing_access_permission);
        });
    });
    return decoded;
}
exports.VerifyIsAdmin = VerifyIsAdmin;
function VerifyIsSuperAdmin(ctx) {
    const decoded = VerifyToken(ctx);
    knex_1.default.transaction(function (trx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield trx('user').where('id', '=', decoded.id).first();
            if (!user)
                throw new Error(errors_1.errors.something_went_wrong);
            if (user.role !== 'super')
                throw new Error(errors_1.errors.missing_access_permission);
        });
    });
    return decoded;
}
exports.VerifyIsSuperAdmin = VerifyIsSuperAdmin;
