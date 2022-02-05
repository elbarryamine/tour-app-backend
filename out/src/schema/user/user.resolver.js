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
exports.logInUser = exports.signUpUser = void 0;
const db_1 = __importDefault(require("../../db"));
const validate_1 = require("../../functions/validate");
const bcrypt_1 = __importDefault(require("bcrypt"));
function signUpUser(_, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, validate_1.validateUserSignUp)(args) && args.password === args.passwordConfirm) {
            const formData = Object.assign({}, args);
            delete formData.passwordConfirm;
            const hashedPassword = yield bcrypt_1.default.hash(formData.password, 10);
            db_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                trx('user').insert(Object.assign(Object.assign({}, args), { password: hashedPassword }));
            })).catch(() => {
                throw new Error('Something Went Wrong');
            });
            return true;
        }
        else {
            throw new Error('Invalid Data');
        }
    });
}
exports.signUpUser = signUpUser;
function logInUser(_, args, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        // look for provided username in db
        // compare password
        // generate and send token
    });
}
exports.logInUser = logInUser;
