import * as Graphql from 'graphql'
import { CREATE_TOUR_ARGS, TOUR_ARGS } from './tour.args'

export const TourSchema = new Graphql.GraphQLObjectType({
  name: 'Tour',
  fields() {
    return TOUR_ARGS
  },
})
export const CreateTourSchema = new Graphql.GraphQLObjectType({
  name: 'CreateTour',
  fields() {
    return CREATE_TOUR_ARGS
  },
})
