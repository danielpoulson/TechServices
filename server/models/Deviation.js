var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviationSchema = new Schema({
    Id: Number,
    dvNo: {type: String, required: '{PATH} is required!'},
    dvMatNo: {type: String, required: '{PATH} is required!'},
    dvMatName: {type: String, required: '{PATH} is required!'},
    dvCust: {type: String, required: '{PATH} is required!'},
    dvBatchNo: {type: String, required: '{PATH} is required!'},
    dvSupplier: {type: String, required: '{PATH} is required!'},
    dvDOM: {type: Date},
    dvDescribe: {type: String},
    dvAssign: {type: String},
    dvInvest: {type: String},
    dvOutCome: {type:String},
    dvCustSend: {type: Date},
    dvCat: {type: String},
    dvClass: {type: String},
    dvClosed: {Type: Number},
    dvLog: {
        dvLogType : String,
        dvLogBy : String,
        dvLogDate: Date
    }
});

var Deviation = mongoose.model('Deviation', deviationSchema);