import {
  GraphQLObjectType,
  GraphQLInt
} from 'graphql'

import {
  forwardConnectionArgs
} from 'graphql-relay'


import joinMonster from 'join-monster'
import knex from '../../db'

import { Round, RoundConnection } from '../types/Round'

const round = {
  type: Round,
  args: {
    round_number: {
      type: GraphQLInt
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

const rounds = {
  type: RoundConnection,
  args: {
    round_number: {
      type: GraphQLInt
    },
    ...forwardConnectionArgs
  },
  sqlPaginate: true,
  orderBy: args => {
    const sortBy = args.by || 'round_number'
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



module.exports = { round, rounds }
