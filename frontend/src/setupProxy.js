const { createProxyMiddleware } = require('http-proxy-middleware');

const seamProxy = createProxyMiddleware({
  target: 'http://localhost:5080', // target host
  changeOrigin: true, // needed for virtual hosted sites
  // ws: true, // proxy websockets
  pathRewrite: {
    '^/api': '/api',
  },
});

module.exports = function (app) {
  // app.use('/api', apiProxy);
  app.use('/api', seamProxy);
};
