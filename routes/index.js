const
  express = require('express'),
  webhook = require('./webhook');

const
  router = express.Router();

router.use('/webhook', webhook);

module.exports = router;