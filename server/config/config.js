var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    dev: {
        db: 'mongodb://localhost/techservices',
        rootPath: rootPath,
        staticFiles: rootPath + 'public/',
        appViews: rootPath + '/public/views/',
        views: 'views'
        //port: process.env.PORT || 3030
    },
    build: {
        rootPath: rootPath,
        staticFiles: rootPath + 'build/',
        appViews: rootPath + 'build/views/',
        views: 'views',
        db: 'mongodb://localhost/techservices'
        //port: process.env.PORT || 8080
    }
};