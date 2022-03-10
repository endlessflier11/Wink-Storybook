const AWS = require('aws-sdk');
const jwt_decode = require('jwt-decode');
const graph = require('./graph');

async function uploadFile(
  filename,
  originalFilename,
  mimetype,
  buffer,
  context
) {
  // Create S3 service object
  let s3 = new AWS.S3({ apiVersion: '2006-03-01' });

  console.log('uploading image => %o', { filename, mimetype });
  // Setting up S3 upload parameters
  const params = {
    Bucket: 'dearduck-image-store',
    Key: filename,
    Body: buffer,
    //ContentEncoding: 'base64',
    ContentType: mimetype,
    Metadata: {
      originalFilename: originalFilename,
    },
  };

  // Uploading files to the bucket
  let cloudRes = await s3.upload(params).promise();
  return { filename: cloudRes.Location };
}

module.exports = (router) => {
  router.put('/api/user/avatar', async (req, res) => {
    const { user, body } = req;

    let ext = 'png';
    if (body.mimeType === 'image/jpg' || body.mimeType === 'jpeg') {
      ext = 'jpg';
    } else if (body.mimeType === 'image/png') {
      ext = 'png';
    } else if (body.mimeType === 'image/gif') {
      ext = 'gif';
    }

    const now = Date.now();
    const filename = `avatar_${user.firstname}_${user.lastname}_${user.id}_${now}.${ext}`;

    await uploadFile(
      filename,
      body.originalFilename,
      body.mimeType,
      Buffer.from(
        body.buffer.substring('data:image/png;base64,'.length),
        'base64'
      ),
      context
    );

    let updatedUser = await graph.first(`
      MATCH (u:User) WHERE u.id = ${user.id}
      SET u.avatar = '${`/seam/resource/${filename}`}'
      RETURN u AS \`user\`
    `);
    res.send({
      ok: true,
      user: {
        id: updatedUser.id,
        avatar: updatedUser.avatar,
      },
    });
  });

  return router;
};
