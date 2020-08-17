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
    insert
  };
})();