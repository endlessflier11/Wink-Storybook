const { response } = require('express');
const neo4j = require('neo4j-driver');
const isNode = require('neo4j-driver-core/lib/graph-types').isNode;
const isInt = require('neo4j-driver-core/lib/integer').isInt;
const isDate = require('neo4j-driver-core/lib/temporal-types').isDate;

// @patrick.bergeron - GRAPH_HOST env variable takes precedence over everything.
const graphHost = process.env.GRAPH_HOST || 'localhost:7687';
const graphUsername = process.env.GRAPH_USERNAME || 'neo4j';
const graphPassword = process.env.GRAPH_PASSWORD || 'qu@ck00';
console.log(`connecting to graph ${graphUsername}@neo4j://${graphHost}...`);

const driver = neo4j.driver(
  `neo4j://${graphHost}`,
  neo4j.auth.basic(graphUsername, graphPassword)
);

var graph = {
  streamFirst: (cmd) => {
    return new Promise((resolve, reject) => {
      const session = driver.session();
      if (!session) {
        console.log('session not obtained!');
        reject('session not obtained!');
      }
      session
        .run({ text: cmd })
        .then(graph.transformFirst)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          console.log(`closing session => ${session.id}`);
          session.close();
        });
    });
  },
  connect: async function () {
    let [conn, txn] = [null, null];
    try {
      conn = driver.session();
      txn = conn.beginTransaction();
    } catch (e) {
      console.log(e);
      if (conn) {
        try {
          await conn.close();
        } catch (e) {
          console.log(e);
        }
      }
    }
    return [conn, txn];
  },

  first: async function (command) {
    let result = null;
    let records = await this.run(command);

    // @patrick.bergeron - if your query only returns a single node/object (one key), return
    //   that node/object as this method's return value; otherwise return a "wrapper" object
    //   where each field (key) in the result becomes an attribute
    //     ... e.g.:
    //
    //    query : MATCH(u:User) WHERE u.id = ID(u) RETURN u.firstname, u.lastname
    //   will return: { firstname, lastname }

    if (records && records.length > 0) {
      result = graph.transform(records[0]);
    }
    return result;
  },
  all: async function (command) {
    let records = await this.run(command);
    if (records.length > 1) {
      for (let i = 0; i < records.length; i++) {
        records[i] = graph.transform(records[i]);
      }
    } else if (records.length === 1) {
      records[0] = graph.transform(records[0]);
    }
    return records;
  },
  run: async function (cmd) {
    let records = null;
    let session = null;
    try {
      session = driver.session();
      console.log(cmd);
      let result = await session.run(cmd);
      records = result.records;
    } catch (e) {
      console.error(e);
    } finally {
      if (session) {
        try {
          await session.close();
        } catch (e) {
          console.error(e);
        }
      }
    }
    return records;
  },

  unwrap: (obj) => {
    var result = null;
    if (isNode(obj)) {
      var keys = Object.keys(obj.properties || obj);
      keys.forEach((key) => {
        if (isInt(obj.properties[key])) {
          obj.properties[key] = neo4j.integer.toNumber(obj.properties[key]);
        } else if (isDate(obj.properties[key])) {
          let dateval = graph.unwrap(obj.properties[key]);
          obj.properties[key] = dateval;
        } else {
          if (typeof obj.properties[key] === 'string') {
            if (
              (obj.properties[key].startsWith('{') &&
                !obj.properties[key].startsWith('{{')) ||
              obj.properties[key].startsWith('[')
            ) {
              obj.properties[key] = JSON.parse(obj.properties[key]);
            }
          }
        }
      });
      result = obj.properties;
    } else if (isInt(obj)) {
      result = neo4j.integer.toNumber(obj);
    } else if (isDate(obj)) {
      result = `${neo4j.integer.toNumber(obj.year)}-${neo4j.integer.toNumber(
        obj.month
      )}-${neo4j.integer.toNumber(obj.day)}`;
    } else if (Array.isArray(obj)) {
      result = [];
      obj.forEach((e) => {
        result.push(graph.unwrap(e));
      });
    } else if (typeof obj === 'string') {
      if (
        (obj.startsWith('{') && !obj.startsWith('{{')) ||
        obj.startsWith('[')
      ) {
        obj = JSON.parse(obj);
      }
      result = obj;
    } else if (typeof obj === 'object') {
      if (obj !== null) {
        var keys = Object.keys(obj);
        keys.forEach((key) => {
          obj[key] = graph.unwrap(obj[key]);
        });
      }
      result = obj;
    } else {
      result = obj;
    }
    return result;
  },

  transformFirst: (result) => {
    return new Promise((resolve, reject) => {
      if (result.records?.length > 0) {
        resolve(graph.transform(result.records[0]));
      }
      resolve(null);
    });
  },

  transform: (record) => {
    let result = {};
    if (record.keys.length === 1) {
      result = graph.unwrap(record.get(record.keys[0]));
    } else {
      for (let i = 0; i < record.keys.length; i++) {
        let key = record.keys[i];
        result[key] = graph.unwrap(record.get(key));
      }
    }
    return result;
  },
};

module.exports = graph;
