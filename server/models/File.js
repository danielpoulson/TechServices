var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var filesSchema = new Schema({

    fsFileName: {type: String, required: '{PATH} is required!'},
    fsFileExt: {type: String, required: '{PATH} is required!'},
    fsAddedBy: {type: String, required: '{PATH} is required!'},
    fsAddedAt: {type: Date},
    fsDevNo: {type: String, required: '{PATH} is required!'}


});

var File = mongoose.model('File', filesSchema);
