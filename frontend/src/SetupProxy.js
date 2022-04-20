const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
  app.use(
    createProxyMiddleware(['/api', '/stomp'], {
      target: 'http://localhost:8080',
      changeOrigin: true,
      ws: true,
      router: {
        '/stomp': 'ws://localhost:8080',
      },
    }),
  );
};
