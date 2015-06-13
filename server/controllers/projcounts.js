var Projcount = require('mongoose').model('Projcount');


exports.getNewProjectNo = function(req, res) {
    Projcount.findOne({}).exec(function(err, collection) {
        res.send(collection);
    })
};

exports.getProjYear = function(req, res) {
    Projcount.find({projYear:req.params.year}).exec(function(err, projNo) {
        res.send(projNo);
    })
};

exports.incProjNo = function(req, res) {
    Projcount.update({projYear:req.params.year}, { $inc: { projCount: 1 } }, function (err) {
        if (err) return handleError(err);
        res.send(200);
    });
};

exports.newProjYear = function(req, res) {
    var yearData = req.body;
    yearData.projCount = 1;
    yearData.projYear = req.params.year;
    Projcount.create(yearData, function (err) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Year');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(200);
    });
};