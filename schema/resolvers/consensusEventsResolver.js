import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import {
  forwardConnectionArgs
} from 'graphql-relay'


import joinMonster from 'join-monster'
import knex from '../../db'

import { ConsensusEvent, ConsensusEventConnection } from '../types/ConsensusEvent'

const consensusEvent = {
  type: ConsensusEvent,
  args: {
    hash: {
      type: GraphQLString
    }
  },
  where: (table, args, context) => {
    var aa = []

    for (var property in args) {
      if(property != 'limit' && property != 'first' && property != 'last' && property != 'before' && property != 'after' && property != 'by') {
        if(typeof args[property] === 'string') {
          aa.push(`${table}.`+property+` like \'`+args[property]+`\'`)
        } else if(typeof args[property] === 'boolean') {
          aa.push(`${table}.`+property+` is `+args[property])
        } else if(typeof args[property] === 'number') {
          aa.push(`${table}.`+property+` = `+args[property])
        }
      }
    }

    return aa.join(' AND ')
  },
  resolve: (parent, args, context, resolveInfo) => {
    return joinMonster(resolveInfo, context, sql => knex.raw(sql), { dialect: 'pg' })
  }
}

const consensusEvents = {
  type: ConsensusEventConnection,
  args: {
    hash: {
      type: GraphQLString
    },
    ...forwardConnectionArgs
  },
  sqlPaginate: true,
  orderBy: args => {
    const sortBy = args.by || 'event_time'
    return {
      [sortBy]: 'asc'
    }
  },
  where: (table, args, context) => {
    var aa = []

    for (var property in args) {
      if(property != 'limit' && property != 'first' && property != 'last' && property != 'before' && property != 'after' && property != 'by' && property != 'situations') {
        if(typeof args[property] === 'string') {
          aa.push(`${table}.`+property+` like \'`+args[property]+`\'`)
        } else if(typeof args[property] === 'boolean') {
          aa.push(`${table}.`+property+` is `+args[property])
        } else if(typeof args[property] === 'number') {
          aa.push(`${table}.`+property+` = `+args[property])
        }
      }
    }

    return aa.join(' OR ')
  },
  resolve: (parent, args, context, resolveInfo) => {
    return joinMonster(resolveInfo, context, sql => knex.raw(sql), { dialect: 'pg' })
  }
}



module.exports = { consensusEvent, consensusEvents }
