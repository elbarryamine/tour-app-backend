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
exports.TourSearchArgs = exports.TourImagesArgs = exports.TourArgs = exports.SearchTourSchema = exports.GetTourSchema = void 0;
const Graphql = __importStar(require("graphql"));
exports.GetTourSchema = new Graphql.GraphQLObjectType({
    name: 'Tour',
    fields() {
        return Object.assign(Object.assign({}, exports.TourArgs), exports.TourImagesArgs);
    },
});
exports.SearchTourSchema = new Graphql.GraphQLObjectType({
    name: 'SearchTour',
    fields() {
        return exports.TourSearchArgs;
    },
});
exports.TourArgs = {
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
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
    },
    description: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
    },
    features: {
        type: new Graphql.GraphQLNonNull(new Graphql.GraphQLList(Graphql.GraphQLString)),
    },
    price: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
    },
    discount: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
    },
};
exports.TourImagesArgs = {
    mainImage: {
        type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
    },
    images: {
        type: new Graphql.GraphQLNonNull(new Graphql.GraphQLList(Graphql.GraphQLString)),
    },
};
exports.TourSearchArgs = {
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
