/**
 * Contextualizer for a given frontend http request.
 */
const https = require('https');

const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

const Handlebars = require('handlebars');
const graph = require('./graph');
const store = require('./store');
const util = require('./util');

async function rq(url, options, content) {
  return new Promise((resolve, reject) => {
    const req = https
      .request(url, options, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        // Any 2xx status code signals a successful response but
        // here we're only checking for 200.
        if (statusCode !== 200) {
          error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error(
            'Invalid content-type.\n' +
              `Expected application/json but received ${contentType}`
          );
        }
        if (error) {
          console.error(error.message);
          // Consume response data to free up memory
          res.resume();
          reject(error);
          return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', async () => {
          try {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
            resolve(parsedData);
          } catch (e) {
            console.error(e.message);
            reject(e);
          }
        });
      })
      .on('error', (e) => {
        console.error(`Got error: ${e.message}`);
        reject(e);
      });
    if (content) {
      req.write(JSON.stringify(content));
    }
    req.end();
  });
}

module.exports = (router, eventEmitter) => {
  let dispatcher = eventEmitter;

  router.post('/api/session/issue_token', async (req, res) => {
    const user = {
      id: 12345,
      firstName: 'Taylor',
      lastName: 'Smith',
      email: 'taylor.smith@wink.com',
      birthDate: '01-01-2000',
      avatar: '',
    };
    const token = jwt.sign(user, process.env.TOKEN_SECRET || 'qu@ck00');
    res.send(token);
  });

  return router;
};
