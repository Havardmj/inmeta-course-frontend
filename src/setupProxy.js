const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    app.use('/course/api', createProxyMiddleware({
        changeOrigin: true,
        pathRewrite: {
            '/course/api': 'course-api'
        },
        target: 'http://localhost:8080',
        proxyTimeout: 30000,
    }));
};
