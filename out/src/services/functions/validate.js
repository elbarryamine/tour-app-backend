"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserSignUp = exports.validateTour = void 0;
const joi_1 = __importDefault(require("joi"));
function validateTour(tour) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(255).required().alphanum(),
        duration: joi_1.default.string().min(1).max(255).required().alphanum(),
        description: joi_1.default.string().min(3).required().alphanum(),
        price: joi_1.default.number().min(0),
        discount: joi_1.default.number().min(0),
        location: joi_1.default.array().items(joi_1.default.string()),
        features: joi_1.default.array().items(joi_1.default.string()),
        rating: joi_1.default.number().min(1).max(5),
        category: joi_1.default.array().items(joi_1.default.string()),
    });
    const result = schema.validate(tour);
    if (result.error || result.warning) {
        return false;
    }
    else {
        return true;
    }
}
exports.validateTour = validateTour;
function validateUserSignUp(user) {
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
        phone: joi_1.default.string(),
        password: joi_1.default.string().required(),
        passwordConfirm: joi_1.default.string().required(),
        birthDate: joi_1.default.string().required(),
    });
    const result = schema.validate(user);
    if (result.error || result.warning) {
        return false;
    }
    else {
        return true;
    }
}
exports.validateUserSignUp = validateUserSignUp;
