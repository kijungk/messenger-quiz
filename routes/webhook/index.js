const
  express = require('express'),
  httpStatusCodes = require('../../utilities/constants/http-status-codes'),
  {
    getMessageByPayload,
    getPayloadByEvent
  } = require('../../utilities/payload-handler'),
  queries = require('../../db/queries'),
  {
    reply
  } = require('../../utilities/reply-handler'),
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
  .post((request, response) => {
    // save body
    const body = request.body;

    // create variables
    let entryId, event, senderId, payload, accessToken, eventId, userId;

    // if the body isn't from a page, return a bad request
    if (body.object !== 'page') {
      return response.sendStatus(httpStatusCodes.badRequest);
    }

    body.entry.forEach((entry) => {
      accessToken = process.env.PAGE_ACCESS_TOKEN; // get access token
      entryId = entry.id; // the page entry id
      event = entry.messaging[0]; // the webhook event
      payload = getPayloadByEvent(event); // get payload based on event type
      senderId = event.sender.id; // the page-scoped id of event sender
    });

    return queries.users.fetchByPageUserId(senderId)
      .then((result) => {
        const user = result.rows[0]; // user in database

        // if there is no user, create one
        if (!user) {
          return queries.users.insert(senderId);
        }

        return user;
      })
      .then((result) => { // result is user
        // get the response message for a corresponding payload
        const message = getMessageByPayload(payload);

        return reply(accessToken, senderId, message);
      })
      .catch((error) => {
        // save error to database
        return queries.errors.insert(error.name, error.message, error.stack);
      })
      .finally(() => {
        // Returns a '200 OK' response to all requests
        return response.sendStatus(httpStatusCodes.ok);
      });
  })

module.exports = router;