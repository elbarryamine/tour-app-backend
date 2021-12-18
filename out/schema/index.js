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
const rootSchema = new Graphql.GraphQLSchema({
    query: new Graphql.GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            getTours: {
                type: new Graphql.GraphQLList(tour_types_1.tourType),
                resolve: tour_resolver_1.getToursResolver,
            },
        }),
    }),
    mutation: new Graphql.GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            createTour: {
                type: Graphql.GraphQLBoolean,
                args: tour_types_1.tourArgs,
                resolve: tour_resolver_1.createTourResolver,
            },
        }),
    }),
});
exports.default = rootSchema;
// createTour: {
// 	type: tourType,
// 	args: tourArgs,
// 	resolve: createTourResolver,
// },
