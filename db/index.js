var config = require('../config/config.js')

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password,
    port: 5432,
  },
  useNullAsDefault: true
})

module.exports = knex
