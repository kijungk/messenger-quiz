module.exports = (function () {
  const
    axios = require('axios'),
    queries = require('../../db/queries');

  function reply(recipientId, message) {
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
          access_token: process.env.PAGE_ACCESS_TOKEN
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
    reply
  };
})();