var TechService = require('mongoose').model('TechService');

exports.getTechServices = function(req, res) {
    TechService.find().sort({LrNo:1}).exec(function(err, collection) {
        res.send(collection);
    })
};

exports.createTechService = function(req, res) {
    TechService.create(req.body, function(err) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Service Request');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(200);
    });
};

exports.getTechServicesById = function(req, res) {
    TechService.findOne({LrNo:req.params.id}).exec(function(err, techService) {
        res.send(techService);
    });
};

exports.updateRequest = function(req, res) {
    console.log(req.body);
    TechService.update({LrNo:req.params.id}, {$set: req.body}, function (err) {
        if (err) return handleError(err);
        res.send(200);
    });
};


exports.requestCountYear = function(req, res) {
    var search = /LR14/;

    TechService.count({LrNo:search}).exec(function (err, count) {
        if (err) return handleError(err);
        res.status(200).send({count: count});
    });



};