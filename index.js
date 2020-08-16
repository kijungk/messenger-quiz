const
  http = require('http'),
  app = require('./server');

const
  PORT = process.env.PORT,
  server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}\n`);
})