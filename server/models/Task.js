var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    ID: Number,
    TKName: {type: String, required: '{PATH} is required!'},
    TKStart: {type: Date, required: '{PATH} is required!'},
    TKTarg: {type: Date, required: '{PATH} is required!'},
    TKChamp: {type: String, required: '{PATH} is required!'},
    TKStat: {type: Number, required: '{PATH} is required!'},
    TKActive: {type: Boolean, required: '{PATH} is required!'},
    TKMile: {type: Number, required: '{PATH} is required!'},
    ProjectId: {type: String, required: '{PATH} is required!'},
    TKComment: String
});

var Task = mongoose.model('Task', taskSchema);/**
 * Created by dpoulson on 2/05/2014.
 */
