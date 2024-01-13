const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./router');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.use(router);

app.listen(config.port, (err) => {
  if (err) {
    console.error('Error occurred starting the server', err);
    process.exit(1);
  }
  console.log(`Server running on port ${config.port}`);
});

module.exports = app;
