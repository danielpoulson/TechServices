var mongoose = require('mongoose');
var projectModel = require('../models/Project');
var taskModel = require('../models/Task');
var ProjcountModel = require('../models/Projcount');
var filesModel = require('../models/File');
var userModel = require('../models/User');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('TechServices db opened');
  });

  //userModel.createDefaultUsers();

};

