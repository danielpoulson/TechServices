var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TechServiceSchema = new Schema({
    LrNo: {type: String, required: '{PATH} is required!'}, //Lab Request Number
    ICode: {type: Number, required: '{PATH} is required!'}, //Item code eg Product Code
    IName: {type: String, required: '{PATH} is required!'},  // Item Name eg Product Name
    IType: {type: String, required: '{PATH} is required!'}, // Type of technical service
    INoSamp: {type: Number, required: '{PATH} is required!'}, // Number of samples
    ICust: {type: String, required: '{PATH} is required!'}, // Customer
    ICmt: String, //Comment
    ISamDesp: String, // A Description about the sample eg 3 month stability
    IBatNo: {type: String, required: '{PATH} is required!'}, // Batch Number
    IStart: {type: Date, required: '{PATH} is required!'}, // Start Date
    ITarg: {type: Date, required: '{PATH} is required!'}, // Target Date
    IComp: {type: Date}, // Date Completed
    ILdTm: Number,
    IResp: {type: String}, // Assigned to responsible
    IStatus: {type: Number, required: '{PATH} is required!'}, // Status
    IChrEx: {type: Number}, // Charge to external customers
    IChrInt: {type: Number}, // Charge to internal customers
    IPo: {type: String}, //Purchase Order No
    IInvDt: {type: Date}, // Invoice Date
    ProjectId: {type: String}

});

var TechService = mongoose.model('TechService', TechServiceSchema);/**
 * Created by dpoulson on 2/05/2014.
 */