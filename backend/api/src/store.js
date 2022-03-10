const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

var store = {
  find: async function (collection, { filter, limit, skip, sort }) {
    let result = null;
    let connectionString =
      process.env.DB_CONNECTION_STRING ||
      'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb';
    let client = null;
    try {
      client = await MongoClient.connect(connectionString, {
        useNewUrlParser: true,
      });
      result = await client
        .db('dearduck')
        .collection(collection)
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .map(({ _id, ...item }) => ({ ...item, id: _id }))
        .toArray();
    } catch (e) {
      console.log(e);
    } finally {
      if (client) client.close();
    }
    return result;
  },
  findById: async function (collection, id) {
    let result = null;
    let connectionString =
      process.env.DB_CONNECTION_STRING ||
      'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb';
    let client = null;
    try {
      client = await MongoClient.connect(connectionString, {
        useNewUrlParser: true,
      });
      result = await client
        .db('dearduck')
        .collection(collection)
        .find({ _id: ObjectId(id) })
        .map(({ _id, ...item }) => ({ ...item, id: _id }))
        .toArray();
    } catch (e) {
      console.log(e);
    } finally {
      if (client) client.close();
    }
    return result;
  },
  get: async function (collection, name) {
    let result;
    let connectionString =
      process.env.DB_CONNECTION_STRING ||
      'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb';
    let client = null;
    try {
      client = await MongoClient.connect(connectionString, {
        useNewUrlParser: true,
      });
      result = await client
        .db('dearduck')
        .collection(collection)
        .findOne({ name });
      if (result) {
        result.id = result._id;
        delete result._id;
      }
    } catch (e) {
      console.log(e);
    } finally {
      if (client) client.close();
    }
    return result;
  },
  getTemplate: async function (name) {
    let result;
    let connectionString =
      process.env.DB_CONNECTION_STRING ||
      'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb';
    let client = null;
    try {
      client = await MongoClient.connect(connectionString, {
        useNewUrlParser: true,
      });
      let doc = await client
        .db('dearduck')
        .collection('templates')
        .findOne({ name });
      result = Buffer.from(doc.template, 'base64').toString('ascii');
    } catch (e) {
      console.log(e);
    } finally {
      if (client) client.close();
    }
    return result;
  },
  save: async function (collection, content) {
    let result;
    let connectionString =
      process.env.DB_CONNECTION_STRING ||
      'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb';
    let client = null;
    try {
      client = await MongoClient.connect(connectionString, {
        useNewUrlParser: true,
      });
      let id = null;
      if (content.id) {
        console.log('replacing document => %o', content);
        id = content.id;
        delete content.id;
        await client
          .db('dearduck')
          .collection(collection)
          .replaceOne({ _id: ObjectId(id) }, { ...content });
        content.id = id;
      } else {
        console.log('inserting document => %o', content);
        const doc = await client
          .db('dearduck')
          .collection(collection)
          .insertOne({ ...content });
        id = doc.insertedId;
      }
      result = { ...content, id };
      console.log('result => %o', result);
    } catch (e) {
      console.log(e);
    } finally {
      if (client) client.close();
    }
    return result;
  },
  delete: async function (collection, id) {
    let result;
    let connectionString =
      process.env.DB_CONNECTION_STRING ||
      'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb';
    let client = null;
    try {
      client = await MongoClient.connect(connectionString, {
        useNewUrlParser: true,
      });
      result = await client
        .db('dearduck')
        .collection(collection)
        .deleteOne({ _id: ObjectId(id) });
    } catch (e) {
      console.log(e);
    } finally {
      if (client) client.close();
    }
    return result;
  },
};

module.exports = store;
