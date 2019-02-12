const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/db',
        { target: 'http://localhost:5000/' }
    ));
}
