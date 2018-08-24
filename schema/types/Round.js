import {
  GraphQLObjectType,
  GraphQLInt
} from 'graphql'

import GraphQLJSON from 'graphql-type-json';

import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay'

import { nodeInterface } from './Node'

const Round = new GraphQLObjectType({
  description: 'Round',
  name: 'Round',
  sqlTable: 'rounds',
  uniqueKey: 'round_number',
  interfaces: [ nodeInterface ],
  fields: () => ({
    id: {
      description: 'The global ID for the Relay spec',
      ...globalIdField(),
      sqlDeps: [ 'round_number' ]
    },
    round_number: {
      type: GraphQLInt
    },
    payload: {
      type: GraphQLJSON
    }
  })
})

const { connectionType: RoundConnection } = connectionDefinitions({ nodeType: Round })

export { Round, RoundConnection }
