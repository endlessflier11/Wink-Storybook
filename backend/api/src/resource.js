const AWS = require('aws-sdk');

module.exports = (router) => {
  router.get('/api/resource/:filename', async (req, res) => {
    const { filename } = req.params;
    let s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    const params = {
      Bucket: 'cfynrf',
      Key: filename,
    };
    let obj = await s3.getObject(params);
    if (obj) {
      obj.createReadStream().pipe(res);
    }
  });

  return router;
};
