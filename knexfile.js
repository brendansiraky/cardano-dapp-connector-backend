const config = require('./config');

const { POSTGRES_HOST } = config

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: POSTGRES_HOST,
      database: 'cardano_dapp_connector',
      user: 'postgres',
      password: 'postgres'
    },
  },

};
