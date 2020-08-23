const
  bodyParser = require('body-parser'),
  express = require('express'),
  forceSSL = require('./utilities/force-ssl'),
  routes = require('./routes');

const
  app = express();

// body-parser middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// middleware function to redirect http requests to https
app.use(forceSSL());

// using static frontend routes
app.use(express.static(__dirname + '/messenger-quiz-frontend'));

// all other api routes
app.use('/api', routes);

// catchall to serve back HTML if no routes are met(frontend handles 404)
app.get('*', (request, response) => {
  return response.sendFile(__dirname + '/messenger-quiz-frontend/index.html',
    (error) => {
      if (error) {
        response.status(500).json(error);
      }
    })
});

module.exports = app;