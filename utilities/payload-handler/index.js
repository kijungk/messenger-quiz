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
        home,
        A,
        B,
        C
      } = require('../constants/message-options').quickReplies;

    let attachment, buttons, elements, message, quickReplies;

    switch (payload) {
      case 'Home':
        buttons = [
          new Button('How to Play', postback, 'How to Play'),
          new Button('Leaderboard', postback, 'Leaderboard')
        ];

        elements = [
          new Element('Facebook Marketing Partners for Messaging', null, 'https://via.placeholder.com/1910x1000', buttons)
        ];

        attachment = new Attachment(generic, elements);

        break;

      case 'How to Play':
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

        break;

      case 'Trivia Times':
        attachment = 'Not implemented.'

        quickReplies = [
          new QuickReply(back, 'How to Play'),
          new QuickReply(home, 'Home')
        ];

        break;

      case 'Earning Points':
        attachment = 'Not implemented.'

        quickReplies = [
          new QuickReply(back, 'How to Play'),
          new QuickReply(home, 'Home')
        ];

        break;

      case 'Redeeming Points':
        attachment = 'Not implemented.'

        quickReplies = [
          new QuickReply(back, 'How to Play'),
          new QuickReply(home, 'Home')
        ];

        break;

      case 'Leaderboard':
        attachment = 'Not implemented.'

        quickReplies = [
          new QuickReply(back, 'Home'),
          new QuickReply(home, 'Home')
        ];

        break;

      case 'Question 1':
        attachment = 'Quick knowledge check!\nWhat customers might be expecting from your business with Messaging?\n\nA: Real time response for their enquiries\nB: Understand their needs and expectations\nC: All of the above';

        quickReplies = [
          new QuickReply(A, 'Question 1 A'),
          new QuickReply(B, 'Question 1 B'),
          new QuickReply(C, 'Question 1 C')
        ]

        break;

      case 'Question 2':
        attachment = 'Quick knowledge check!\nWhat is the name of the Facebook Marketing Partners that we just introduced to you?\n\nA: Waffle\nB: Pancake\nC: Croissant';

        quickReplies = [
          new QuickReply(A, 'Question 2 A'),
          new QuickReply(B, 'Question 2 B'),
          new QuickReply(C, 'Question 2 C')
        ]

        break;

      case 'Question 3':
        attachment = `Quick knowledge check!\nWhat is NOT the name of Haravan's solutions?\n\nA: HaraFunnel\nB: HaraSocial\nC: HaraTunnel`;

        quickReplies = [
          new QuickReply(A, 'Question 3 A'),
          new QuickReply(B, 'Question 3 B'),
          new QuickReply(C, 'Question 3 C')
        ]

        break;

      default:
        attachment = 'Sorry, I don\'t understand what you\'re saying :(';

        quickReplies = [
          new QuickReply('Home', 'Home')
        ];

        break;
    }

    message = new Message(attachment, quickReplies);

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