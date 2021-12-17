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
const graphql = __importStar(require("graphql"));
const functions_1 = require("../functions");
const rootSchema = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            getTours: {
                type: graphql.GraphQLString,
                resolve: function (parent, args, context, info) {
                    return 'hi';
                },
            },
        }),
    }),
    mutation: new graphql.GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            createTour: {
                type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean),
                args: {
                    name: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                    },
                    category: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                    },
                    rating: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLInt),
                    },
                    location: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                    },
                    duration: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                    },
                    description: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                    },
                    features: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                    },
                    price: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                    },
                    discount: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                    },
                    mainImage: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                    },
                    images: {
                        type: new graphql.GraphQLNonNull(graphql.GraphQLString),
                    },
                },
                resolve: functions_1.createTour,
            },
        }),
    }),
});
exports.default = rootSchema;
