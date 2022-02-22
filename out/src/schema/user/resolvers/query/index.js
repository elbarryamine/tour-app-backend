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
exports.isUserHaveAccessToApp = exports.logInUser = void 0;
const knex_1 = __importDefault(require("../../../../services/knex"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const errors_1 = require("../../../../services/errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken_1 = require("../../../../services/functions/verifyToken");
function logInUser(_, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        // look for provided username in db
        try {
            return yield knex_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const user = yield trx('user').where('email', '=', args.email).limit(1).first();
                if (!user) {
                    throw new Error(errors_1.errors.wrong_email_or_password);
                }
                const isValidPassword = yield bcrypt_1.default.compare(args.password, user.password);
                if (!isValidPassword) {
                    throw new Error(errors_1.errors.wrong_email_or_password);
                }
                const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.PRIVATE_KEY, {
                    expiresIn: '3d',
                });
                ctx.res.cookie('token', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days,
                });
                const _user = user;
                delete _user.password;
                return _user;
            }));
        }
        catch (e) {
            throw new Error(e.message || errors_1.errors.something_went_wrong);
        }
    });
}
exports.logInUser = logInUser;
function isUserHaveAccessToApp(_, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, verifyToken_1.VerifyToken)(ctx)) {
            return true;
        }
        else {
            return false;
        }
    });
}
exports.isUserHaveAccessToApp = isUserHaveAccessToApp;
