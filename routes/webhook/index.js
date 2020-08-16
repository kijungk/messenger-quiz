const
  express = require('express'),
  httpStatusCodes = require('../../utilities/constants/http-status-codes'),

  const router = express.Router();

router.route('/')
  .get((request, response) => {
    const webhookVerificationToken = process.env.WEBHOOK_VERIFICATION_TOKEN;

    const
      mode = request.query['hub.mode'],
      token = request.query['hub.verify_token'],
      challenge = request.query['hub.challenge'];

    if (!mode || !token) {
      return response.sendStatus(httpStatusCodes.unauthorized)
    }

    if (mode !== 'subscribe' || token !== webhookVerificationToken) {
      return response.sendStatus(httpStatusCodes.forbidden);
    }

    return response.status(httpStatusCodes.ok).send(challenge);
  })

module.exports = router;