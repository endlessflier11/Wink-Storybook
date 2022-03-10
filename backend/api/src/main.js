const express = require('express');
const router = require('express-promise-router')();

const util = require('./util');

const session = require('./session')(router);
const resources = require('./resource')(router);
const nodeModule = require('./modules/node')(router);

const app = express();
const port = 5080;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// log import request variables on every call
//   also setup necessary context (e.g. isLocal) to be used by all handlers
app.use(util.printr);
app.use(util.context);

router.use((err, req, res, next) => {
  console.log(err);
  if (err) res.status(500).send('internal server error. check server logs.');
});

router.get('/health', (req, res) => {
  res.status(200).send('ok');
});

app.use(router);

app.listen(port, () => {
  console.log(
    `Curated-for-you api service listening at http://localhost:${port}`
  );

  console.log('Environment variables: ');
  console.log(process.env);
});
