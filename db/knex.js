const
  config = require('../knexfile')[environment],
  environment = process.env.ENVIRONMENT || 'production',
  knex = require('knex')(config);

module.exports = knex;