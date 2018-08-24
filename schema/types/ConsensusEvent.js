import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import GraphQLJSON from 'graphql-type-json';

import {
  globalIdField,
  connectionDefinitions
} from 'graphql-relay'

import { nodeInterface } from './Node'

const ConsensusEvent = new GraphQLObjectType({
  description: 'ConsensusEvent',
  name: 'ConsensusEvent',
  sqlTable: 'consensus_events_data',
  uniqueKey: 'hash',
  interfaces: [ nodeInterface ],
  fields: () => ({
    id: {
      description: 'The global ID for the Relay spec',
      ...globalIdField(),
      sqlDeps: [ 'hash' ]
    },
    hash: {
      type: GraphQLString
    },
    payload: {
      type: GraphQLJSON
    },
    event_time: {
      type: GraphQLString
    }
  })
})

const { connectionType: ConsensusEventConnection } = connectionDefinitions({ nodeType: ConsensusEvent })

export { ConsensusEvent, ConsensusEventConnection }
