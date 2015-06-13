var Deviation = require('mongoose').model('Deviation');

exports.getDeviations = function(req, res) {
    var status = parseInt(req.params.status);

    Deviation.find({dvClosed: {$lt:status}}, {dvNo:true, dvMatNo:true, dvMatName:true, dvCust:true, dvAssign:true })
        .sort({dvNo:1})
        .exec(function(err, collection) {
            if(err){
                console.log("get deviations : " + err);
            }
        res.send(collection);
    })
};

exports.updateDeviation = function(req, res) {

    Deviation.update({dvNo:req.params.id}, {$set: req.body}, function (err) {
        if (err) {
            console.log({reason:err.toString()});
        }
        res.send(200);
    });
};


exports.deleteDeviation = function(req, res) {
    Deviation.remove({ProjNo:req.params.id}, function (err) {
        if (err) return handleError(err);
        res.send(200);
    });
};

exports.createDeviation = function(req, res) {
    Deviation.update({dvNo:req.params.id}, req.body, {upsert: true}, function(err) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(200);
        });
};

exports.getDeviationById = function(req, res) {
    Deviation.findOne({dvNo:req.params.id}).exec(function(err, data) {
        res.send(data);
    })
};

exports.getDeviationNameById = function(req, res) {
    Deviation.findOne({ProjNo:req.params.id}, {ProjNo:true, Title:true, _id:false}).exec(function(err, project) {
        res.send(project);
    })
};

exports.deviationCountYear = function(req, res) {
    //TODO remove static route
    var search = /DV14/;

    Deviation.count({dvNo: search}).exec(function (err, count) {
        if (err) return handleError(err);
        res.status(200).send({count: count});
    });
};

