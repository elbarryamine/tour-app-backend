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
exports.seed = void 0;
const faker_1 = __importDefault(require("faker"));
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex('user').del();
        yield knex('tour').del();
        // await knex('notification').del();
        // await knex('booking').del();
        // await knex('review').del();
        // Inserts seed entries
        let seedsUser = [];
        for (let i = 0; i < 10; i++) {
            seedsUser.push({
                id: i,
                firstName: faker_1.default.name.firstName(),
                lastName: faker_1.default.name.lastName(),
                email: faker_1.default.internet.email(),
                phone: faker_1.default.phone.phoneNumber(),
                password: faker_1.default.random.words(),
                birthDate: faker_1.default.date.past(5).toISOString().slice(0, 19).replace('T', ' '),
                avatar: faker_1.default.random.image(),
            });
        }
        yield knex('user').insert(seedsUser);
        let seedsTour = [];
        for (let i = 0; i < 10; i++) {
            const categories = ['Quad', 'Beach', 'Mountain', 'Hiking', 'Ballon'];
            const feature = ['Support Kids', 'breakfast', 'Dinner'];
            const selectedCategories = [];
            const selectedFeatures = [];
            feature.forEach((el) => {
                if (Math.floor(Math.random() * 2) == 1)
                    selectedFeatures.push(el);
            });
            categories.forEach((el) => {
                if (Math.floor(Math.random() * 2) == 1)
                    selectedCategories.push(el);
            });
            if (!selectedFeatures.length) {
                selectedFeatures.push(feature[Math.floor(Math.random() * feature.length + 0)]);
            }
            if (!selectedCategories.length) {
                selectedCategories.push(categories[Math.floor(Math.random() * categories.length + 0)]);
            }
            seedsTour.push({
                name: faker_1.default.name.title(),
                rating: faker_1.default.datatype.number({ min: 1, max: 5 }),
                duration: faker_1.default.datatype.number({ min: 1, max: 5 }),
                description: faker_1.default.lorem.words(),
                price: faker_1.default.datatype.number(),
                discount: faker_1.default.datatype.number(),
                mainImage: faker_1.default.random.image(),
                images: JSON.stringify([faker_1.default.random.image(), faker_1.default.random.image(), faker_1.default.random.image()]),
                location: JSON.stringify([faker_1.default.address.city(), faker_1.default.address.city(), faker_1.default.address.city()]),
                features: JSON.stringify(selectedFeatures),
                category: JSON.stringify(selectedCategories),
                createdBy: i,
            });
        }
        yield knex('tour').insert(seedsTour);
    });
}
exports.seed = seed;
