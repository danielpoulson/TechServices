var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectNoSchema = new Schema({
    projYear: {
        type: Number,
        required: '{Year} is required!',
        unique: true
    },
    projCount: Number
});

var Projcount = mongoose.model('Projcount', projectNoSchema);
