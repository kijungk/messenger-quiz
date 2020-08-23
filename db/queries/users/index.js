module.exports = (function () {
  const knex = require('../../knex');

  function fetchByPageUserId(pageUserId) {
    return knex.raw(`
      SELECT
        id, page_user_id
      FROM
        users
      WHERE
        page_user_id = :pageUserId
    `, {
      pageUserId
    });
  }

  function getAll() {
    return knex.raw(`
      SELECT
        page_user_id
      FROM
        users
    `);
  }

  function insert(pageUserId) {
    return knex.raw(`
      INSERT INTO
        users (page_user_id)
      VALUES
        (:pageUserId)
      RETURNING
        id, page_user_id
    `, {
      pageUserId
    });
  }

  return {
    fetchByPageUserId,
    getAll,
    insert
  };
})();