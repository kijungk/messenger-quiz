const
  express = require('express'),
  router = express.Router();

router.route('/questions')
  .post((request, response) => {
    return response.status(200).json({
      success: true
    });
  });

router.route('/messages')
  .post((request, response) => {

  });

module.exports = router;