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
const tour_args_1 = require("./tour/tour.args");
const resolvers_1 = require("./tour/resolvers");
const user_args_1 = require("./user/user.args");
const tour_schema_1 = require("./tour/tour.schema");
const resolvers_2 = require("./user/resolvers");
const user_schema_1 = require("./user/user.schema");
const rootSchema = new Graphql.GraphQLSchema({
    query: new Graphql.GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            getTours: {
                type: new Graphql.GraphQLList(tour_schema_1.TourSchema),
                resolve: resolvers_1.getToursResolver,
            },
            searchTour: {
                type: new Graphql.GraphQLList(tour_schema_1.TourSchema),
                args: tour_args_1.TOUR_SEARCH_ARGS,
                resolve: resolvers_1.searchToursResolver,
            },
            signIn: {
                type: new Graphql.GraphQLNonNull(user_schema_1.UserSchema),
                args: user_args_1.UserSignInSchemaArgs,
                resolve: resolvers_2.logInUser,
            },
            verifyUser: {
                type: Graphql.GraphQLBoolean,
                resolve: resolvers_2.isUserHaveAccessToApp,
            },
        }),
    }),
    mutation: new Graphql.GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            signUp: {
                type: Graphql.GraphQLBoolean,
                args: user_args_1.UserSignUpSchemaArgs,
                resolve: resolvers_2.signUpUser,
            },
            createTour: {
                type: tour_schema_1.CreateTourSchema,
                args: tour_args_1.CREATE_TOUR_ARGS,
                resolve: resolvers_1.createTourResolver,
            },
            deleteTour: {
                type: Graphql.GraphQLBoolean,
                args: tour_args_1.DELETE_TOUR_ARGS,
                resolve: resolvers_1.deleteTourResolver,
            },
        }),
    }),
});
exports.default = rootSchema;
