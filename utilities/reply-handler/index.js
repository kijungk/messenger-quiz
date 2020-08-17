module.exports = (function () {
  const
    axios = require('axios'),
    queries = require('../../db/queries');

  function broadcast(recipients, message) {
    const config = {
      url: 'https://graph.facebook.com/v8.0/me/messages',
      method: 'post',
      params: {
        access_token: process.env.PAGE_ACCESS_TOKEN
      },
      data: {
        message
      }
    };

    let counter = 0;

    recipients.forEach((recipient) => {
      config.data.recipient = {
        id: recipient.page_user_id
      }

      // need to throttle below API call
      return axios(config)
        .then(() => {
          console.log(`Broadcast successfully sent to ${++counter} users`);

          return;
        })
        .catch((error) => {
          return queries.errors.insert(error.name, error.message, error.stack);
        });
    });

    return;
  }

  function reply(access_token, recipientId, message) {
    const
      data = {
        recipient: {
          id: recipientId
        },
        message
      },
      config = {
        url: 'https://graph.facebook.com/v8.0/me/messages',
        method: 'post',
        params: {
          access_token
        },
        data
      };

    return axios(config)
      .then((response) => {
        const recipientId = response.data.recipient_id;

        console.log(`Message successfully sent to recipient: ${recipientId}`);

        return;
      })
      .catch((error) => {
        return queries.errors.insert(error.name, error.message, error.stack);
      });
  }

  return {
    broadcast,
    reply
  };
})();