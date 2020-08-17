const
  environment = process.env.ENVIRONMENT || 'production',
  config = require('../knexfile')[environment],
  knex = require('knex')(config);

module.exports = knex;