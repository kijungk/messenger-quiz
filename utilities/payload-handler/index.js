module.exports = (function () {
  function getMessageByPayload(payload) {
    const
      Attachment = require('../../utilities/models/Attachment'),
      Button = require('../../utilities/models/Button'),
      Element = require('../../utilities/models/Element'),
      Message = require('../../utilities/models/Message'),
      QuickReply = require('../../utilities/models/QuickReply'),
      {
        button,
        generic
      } = require('../constants/message-options').attachments,
      {
        postback,
        webUrl
      } = require('../constants/message-options').buttons,
      {
        back,
        home
      } = require('../constants/message-options').quickReplies;

    let attachment, buttons, elements, message, quickReplies;

    switch (payload) {
      case "Home":
        buttons = [
          new Button('How to Play', postback, 'How to Play'),
          new Button('Leaderboard', postback, 'Leaderboard')
        ];

        elements = [
          new Element('Facebook Marketing Partners for Messaging', null, 'https://via.placeholder.com/1910x1000', buttons)
        ];

        attachment = new Attachment(generic, elements);

        message = new Message(attachment, quickReplies);

        break;

      case "How to Play":
        buttons = [
          new Button('Trivia Times', postback, 'Trivia Times'),
          new Button('Earning Points', postback, 'Earning Points'),
          new Button('Redeeming Points', postback, 'Redeeming Points')
        ];

        elements = [
          new Element('How to Play', 'Trivia times and how to earn points', 'https://via.placeholder.com/1910x1000', buttons)
        ];

        attachment = new Attachment(generic, elements);

        quickReplies = [
          new QuickReply(back, 'Home'),
          new QuickReply(home, 'Home')
        ];

        message = new Message(attachment, quickReplies);

        break;

      case "Trivia Times":
        attachment = 'Not implemented.'

        quickReplies = [
          new QuickReply(back, 'How to Play'),
          new QuickReply(home, 'Home')
        ];

        message = new Message(attachment, quickReplies);

        break;

      case "Earning Points":
        attachment = 'Not implemented.'

        quickReplies = [
          new QuickReply(back, 'How to Play'),
          new QuickReply(home, 'Home')
        ];

        message = new Message(attachment, quickReplies);

        break;

      case "Redeeming Points":
        attachment = 'Not implemented.'

        quickReplies = [
          new QuickReply(back, 'How to Play'),
          new QuickReply(home, 'Home')
        ];

        message = new Message(attachment, quickReplies);

        break;

      case "Leaderboard":
        attachment = 'Not implemented.'

        quickReplies = [
          new QuickReply(back, 'Home'),
          new QuickReply(home, 'Home')
        ];

        message = new Message(attachment, quickReplies);

        break;

      default:
        attachment = 'Sorry, I don\'t understand what you\'re saying :(';

        quickReplies = [
          new QuickReply('Home', 'Home')
        ];

        message = new Message(attachment, quickReplies);

        break;
    }

    return message;
  }

  function getPayloadByEvent(event) {
    switch (true) {
      case !!event.referral:
        return event.referral.ref;

      case !!event.message:
        if (event.message.quick_reply) {
          return event.message.quick_reply.payload;
        }

        return event.message.text;

      case !!event.postback:
        if (event.postback.referral) {
          return event.postback.referral.ref;
        }

        return event.postback.payload;
    }
  }


  return {
    getMessageByPayload,
    getPayloadByEvent
  };
})();