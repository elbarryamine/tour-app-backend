import * as Graphql from 'graphql'
import { TOUR_SEARCH_ARGS, CREATE_TOUR_ARGS, TOUR_ARGS, DELETE_TOUR_ARGS, GET_TOUR_BY_USER_ID } from './args'
import {
  getInActiveToursResolver,
  getLatestToursResolver,
  getToursOfAnyUserResolver,
  getToursResolver,
  searchToursResolver,
} from './query'
import { createTourResolver, deleteTourResolver } from './mutation'

const TourSchema = new Graphql.GraphQLObjectType({
  name: 'Tour',
  fields() {
    return TOUR_ARGS
  },
})
const CreateTourSchema = new Graphql.GraphQLObjectType({
  name: 'CreateTour',
  fields() {
    return CREATE_TOUR_ARGS
  },
})

export const tourQuery: Graphql.ThunkObjMap<Graphql.GraphQLFieldConfig<any, any, any>> = {
  getTours: {
    type: new Graphql.GraphQLList(TourSchema),
    resolve: getToursResolver,
  },
  getToursByUser: {
    type: new Graphql.GraphQLList(TourSchema),
    args: GET_TOUR_BY_USER_ID,
    resolve: getToursOfAnyUserResolver,
  },
  getInActiveTours: {
    type: new Graphql.GraphQLList(TourSchema),
    resolve: getInActiveToursResolver,
  },
  getLatestTours: {
    type: new Graphql.GraphQLList(TourSchema),
    resolve: getLatestToursResolver,
  },
  searchTour: {
    type: new Graphql.GraphQLList(TourSchema),
    args: TOUR_SEARCH_ARGS,
    resolve: searchToursResolver,
  },
}

export const tourMutation: Graphql.ThunkObjMap<Graphql.GraphQLFieldConfig<any, any, any>> = {
  createTour: {
    type: CreateTourSchema,
    args: CREATE_TOUR_ARGS,
    resolve: createTourResolver,
  },
  deleteTour: {
    type: Graphql.GraphQLBoolean,
    args: DELETE_TOUR_ARGS,
    resolve: deleteTourResolver,
  },
}
