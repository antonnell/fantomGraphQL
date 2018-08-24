import { GraphQLSchema } from 'graphql'

import QueryRoot from './QueryRoot'

export default new GraphQLSchema({
  description: 'Fantom',
  query: QueryRoot
})
