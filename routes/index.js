const
  express = require('express'),
  broadcasts = require('./broadcasts'),
  webhook = require('./webhook');

const
  router = express.Router();

router.use('/broadcasts', broadcasts);
router.use('/webhook', webhook);

module.exports = router;