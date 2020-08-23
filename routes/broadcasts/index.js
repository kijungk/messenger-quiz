const
  express = require('express'),
  {
    reply
  } = require('../../utilities/reply-handler'),
  {
    getMessageByPayload
  } = require('../../utilities/payload-handler'),
  queries = require('../../db/queries'),
  router = express.Router();

router.route('/questions')
  .post((request, response) => {
    const {
      payload
    } = request.body;

    let count = 0;

    return queries.users.getAll()
      .then((result) => {
        const users = result.rows;

        users.forEach((user) => {
          const
            message = getMessageByPayload(payload),
            pageUserId = user.page_user_id;

          count = ++count;

          return reply(pageUserId, message);
        });

        return;
      })
      .then(() => {
        return response.status(200).json({
          success: true
        });
      })
      .catch((error) => {
        return queries.errors.insert(error.name, error.message, error.stack);
      });
  });

router.route('/messages')
  .post((request, response) => {

  });

module.exports = router;