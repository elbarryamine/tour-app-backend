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
exports.DELETE_TOUR_ARGS = exports.CREATE_TOUR_ARGS = exports.TOUR_SEARCH_ARGS = exports.TOUR_ARGS = void 0;
const Graphql = __importStar(require("graphql"));
exports.TOUR_ARGS = {
    id: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
    },
    name: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
    },
    category: {
        type: new Graphql.GraphQLNonNull(new Graphql.GraphQLList(Graphql.GraphQLString)),
    },
    rating: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
    },
    location: {
        type: new Graphql.GraphQLNonNull(new Graphql.GraphQLList(Graphql.GraphQLString)),
    },
    duration: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
    },
    description: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
    },
    features: {
        type: new Graphql.GraphQLNonNull(new Graphql.GraphQLList(Graphql.GraphQLString)),
    },
    price: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
    },
    discount: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
    },
    mainImage: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
    },
    images: {
        type: new Graphql.GraphQLNonNull(new Graphql.GraphQLList(Graphql.GraphQLString)),
    },
    createdBy: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
    },
    numberOfbooked: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
    },
};
exports.TOUR_SEARCH_ARGS = {
    search: {
        type: Graphql.GraphQLString,
    },
    type: {
        type: Graphql.GraphQLString,
    },
    priceRangeMin: {
        type: Graphql.GraphQLString,
    },
    priceRangeMax: {
        type: Graphql.GraphQLString,
    },
    date: {
        type: Graphql.GraphQLString,
    },
    duration: {
        type: Graphql.GraphQLString,
    },
};
exports.CREATE_TOUR_ARGS = {
    name: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
    },
    category: {
        type: new Graphql.GraphQLNonNull(new Graphql.GraphQLList(Graphql.GraphQLString)),
    },
    rating: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
    },
    location: {
        type: new Graphql.GraphQLNonNull(new Graphql.GraphQLList(Graphql.GraphQLString)),
    },
    duration: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
    },
    description: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
    },
    features: {
        type: new Graphql.GraphQLNonNull(new Graphql.GraphQLList(Graphql.GraphQLString)),
    },
    price: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
    },
    discount: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLInt),
    },
};
exports.DELETE_TOUR_ARGS = {
    ids: {
        type: new Graphql.GraphQLNonNull(new Graphql.GraphQLList(Graphql.GraphQLString)),
    },
};
