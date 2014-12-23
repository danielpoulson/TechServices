var express = require('express'),
    logger = require('morgan'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    bodyParser = require('body-parser');

module.exports = function(app, config) {
    console.log(config.rootPath);
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(session({secret: 'multi vision unicorns'}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(config.rootPath  + '/public'));



};
