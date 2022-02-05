"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Graphql = __importStar(require("graphql"));
const tour_types_1 = require("./tour/tour.types");
const tour_resolver_1 = require("./tour/tour.resolver");
const user_types_1 = require("./user/user.types");
const user_resolver_1 = require("./user/user.resolver");
const rootSchema = new Graphql.GraphQLSchema({
    query: new Graphql.GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            getTours: {
                type: new Graphql.GraphQLList(tour_types_1.TourSchema),
                resolve: tour_resolver_1.getToursResolver,
            },
            signIn: {
                type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
                resolve: user_resolver_1.logInUser,
            },
        }),
    }),
    mutation: new Graphql.GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            signUp: {
                type: Graphql.GraphQLBoolean,
                args: user_types_1.UserSignInSchemaArgs,
                resolve: user_resolver_1.signUpUser,
            },
            searchTour: {
                type: new Graphql.GraphQLList(tour_types_1.TourSchema),
                args: tour_types_1.TourSearchArgs,
                resolve: tour_resolver_1.searchToursResolver,
            },
            createTour: {
                type: tour_types_1.CreateTourSchema,
                args: tour_types_1.createTourArgs,
                resolve: tour_resolver_1.createTourResolver,
            },
        }),
    }),
});
exports.default = rootSchema;
