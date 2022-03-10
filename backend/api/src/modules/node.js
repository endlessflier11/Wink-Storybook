/***********************************************************
 *
 * @author : patrick@dearduck.com
 * @module: node
 *
 *   API for graph node related queries.
 *
 ************************/
const Handlebars = require('handlebars');
const graph = require('../graph');
const store = require('../store');
const util = require('util');

module.exports = (router, eventEmitter) => {
  let dispatcher = eventEmitter;

  router.post('/api/modules/node', (req, res) => {});

  return router;
};
