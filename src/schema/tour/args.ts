import * as Graphql from 'graphql'
export const TOUR_ARGS = {
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
    type: new Graphql.GraphQLNonNull(Graphql.GraphQLFloat),
  },
  location: {
    type: new Graphql.GraphQLNonNull(new Graphql.GraphQLList(Graphql.GraphQLString)),
  },
  duration: {
    type: new Graphql.GraphQLNonNull(Graphql.GraphQLFloat),
  },
  description: {
    type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
  },
  features: {
    type: new Graphql.GraphQLNonNull(new Graphql.GraphQLList(Graphql.GraphQLString)),
  },
  price: {
    type: new Graphql.GraphQLNonNull(Graphql.GraphQLFloat),
  },
  discount: {
    type: new Graphql.GraphQLNonNull(Graphql.GraphQLFloat),
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
  createdAt: {
    type: new Graphql.GraphQLNonNull(Graphql.GraphQLFloat),
  },
  numberOfbooked: {
    type: new Graphql.GraphQLNonNull(Graphql.GraphQLFloat),
  },
}
export const TOUR_SEARCH_ARGS = {
  search: {
    type: Graphql.GraphQLString,
  },
  type: {
    type: Graphql.GraphQLString,
  },
  priceRangeMin: {
    type: Graphql.GraphQLInt,
  },
  priceRangeMax: {
    type: Graphql.GraphQLInt,
  },
  date: {
    type: Graphql.GraphQLString,
  },
  duration: {
    type: Graphql.GraphQLFloat,
  },
}

export const CREATE_TOUR_ARGS = {
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
}
export const DELETE_TOUR_ARGS = {
  ids: {
    type: new Graphql.GraphQLNonNull(new Graphql.GraphQLList(Graphql.GraphQLString)),
  },
}

export const GET_TOUR_BY_USER_ID = {
  id: {
    type: new Graphql.GraphQLNonNull(Graphql.GraphQLString),
  },
}
