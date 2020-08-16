const
  express = require('express'),
  httpStatusCodes = require('../../utilities/constants/http-status-codes'),
  router = express.Router();

router.route('/')
  .get((request, response) => {
    // webhook verification token required to connect to Facebook webhooks
    const webhookVerificationToken = process.env.WEBHOOK_VERIFICATION_TOKEN;

    const
      mode = request.query['hub.mode'],
      token = request.query['hub.verify_token'],
      challenge = request.query['hub.challenge'];

    // if there is no mode or token, webhook connection is from unauthorized source
    if (!mode || !token) {
      return response.sendStatus(httpStatusCodes.unauthorized);
    }

    // if there is a mode, but the mode is not of subscribe or if the token does not match the verification token, the connection is forbidden
    if (mode !== 'subscribe' || token !== webhookVerificationToken) {
      return response.sendStatus(httpStatusCodes.forbidden);
    }

    // all checks passed, webhook challenge can be sent back for verification
    return response.status(httpStatusCodes.ok).send(challenge);
  })

module.exports = router;