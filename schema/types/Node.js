import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay'

import joinMonster from 'join-monster'

import knex from '../../db'

// create the node type and interface
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId, context, resolveInfo) => {
    const { type, id } = fromGlobalId(globalId)
    return joinMonster.getNode(type, resolveInfo, context, parseInt(id), sql => knex.raw(sql))
  },
  obj => obj.__type__
)

export { nodeInterface, nodeField }
