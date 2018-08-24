import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql'

import joinMonster from 'join-monster'

import { nodeField } from './types/Node'

import { round, rounds } from './resolvers/roundsResolver'
import { consensusEvent, consensusEvents } from './resolvers/consensusEventsResolver'

export default new GraphQLObjectType({
  description: 'global query object',
  name: 'Query',
  fields: () => ({
    version: {
      type: GraphQLString,
      resolve: () => joinMonster.version
    },

    node: nodeField,

    // policies_trickle

    //policy

    round: round,
    rounds: rounds,

    consensusEvent: consensusEvent,
    consensusEvents: consensusEvents,

  })
})
