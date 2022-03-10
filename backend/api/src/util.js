/**
 * @author: patrick.bergeron
 * @description
 *    Replace the default console.log call with a custom implementation
 *     that prepends a date/time stamp to each log record. The date/time stamp
 *     format matches the awslogs-datetime-format setting in the task-definition.json
 *     file so that AWS properly groups log messages correctly in CloudWatch.
 *
 */
(function () {
  if (process.env.NODE_ENV === 'production') {
    var __logger = console.log;
    console.log = (...args) => {
      if (Array.isArray(args)) {
        args[0] = `${new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, '')} ${args[0]}`;
      } else if (typeof args === 'string') {
        args = `${new Date()
          .toISOString()
          .replace(/T/, ' ')
          .replace(/\..+/, '')} ${args[0]}`;
      }
      __logger(...args);
    };
  }
})();

const jwt = require('jsonwebtoken');

const util = {
  printr: (req, res, next) => {
    console.log(`${req.path} => %o`, {
      ip: req.ip,
      ips: req.ips,
      protocol: req.protocol,
      hostname: req.hostname,
      isLocal: req.isLocal,
      secure: req.secure,
      method: req.method,
      originalUrl: req.originalUrl,
      path: req.path,
      fresh: req.fresh,
      stale: req.stale,
      subdomains: req.subdomains,
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body,
      cookies: req.cookies,
      signedCookies: req.signedCookies,
      isLocal: req.isLocal,
      customerSlug: req.customerSlug,
      user: req.user,
      authorized: req.authorized,
    });
    next();
  },
  context: (req, res, next) => {
    req.isLocal = req.hostname === 'localhost';
    req.customerSlug = req.hostname.split('.')[0];

    let token = req.get('authorization');
    if (token) {
      token = token.substring(7);
      req.token = token;
      jwt.verify(
        token,
        // Buffer.from(process.env.TOKEN_SECRET || 'qu@ck00', 'base64'),
        process.env.TOKEN_SECRET || 'qu@ck00',
        function (err, decoded) {
          if (err) {
            return res.sendStatus(403);
          }
          req.user = decoded;
          req.authorized = true;
          next();
        }
      );
    } else {
      // @patrick.bergeron - allow AWS health checks and token issuance calls
      //   thru. all other calls require a valid auth header (token)
      if (
        ['/api/session/issue_token', '/health'].indexOf(
          req.path.toLowerCase()
        ) === -1
      ) {
        res.sendStatus(403);
        return;
      }
      next();
    }
  },
  between: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

module.exports = util;
