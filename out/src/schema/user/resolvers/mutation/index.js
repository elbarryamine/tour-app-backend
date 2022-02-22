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
exports.signUpUser = void 0;
const knex_1 = __importDefault(require("../../../../services/knex"));
const validate_1 = require("../../../../services/functions/validate");
const bcrypt_1 = __importDefault(require("bcrypt"));
const errors_1 = require("../../../../services/errors");
function signUpUser(_, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!(0, validate_1.validateUserSignUp)(args) || args.password !== args.passwordConfirm) {
                throw new Error(errors_1.errors.invalid_fields);
            }
            const userInDb = yield (0, knex_1.default)('user')
                .where('email', '=', args.email)
                .orWhere('phone', '=', args.phone)
                .first()
                .catch((err) => {
                throw new Error(err);
            });
            if (userInDb) {
                const isUserHasSameEmail = userInDb.email === args.email ? true : false;
                const isUserHasSamePhone = userInDb.phone === args.phone ? true : false;
                if (isUserHasSameEmail) {
                    throw new Error(errors_1.errors.user_with_same_email_exist);
                }
                if (isUserHasSamePhone) {
                    throw new Error(errors_1.errors.user_with_same_phone_exist);
                }
            }
            const user = Object.assign({}, args);
            delete user.passwordConfirm;
            const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
            yield (0, knex_1.default)('user')
                .insert(Object.assign(Object.assign({}, user), { avatar: '', password: hashedPassword }))
                .catch((err) => {
                throw new Error(err);
            });
            return true;
        }
        catch (e) {
            throw new Error(e.message || errors_1.errors.something_went_wrong);
        }
    });
}
exports.signUpUser = signUpUser;
