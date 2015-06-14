var Project = require('mongoose').model('Project');

exports.getProjects = function(req, res) {
    var status = req.params.status;
    console.log('The status is : ' + status);
    Project.find({Status: {$lt:status}}, {ProjNo:true, Title:true, Champion:true, Site:true, PROJCD:true, PROJTD:true, Status:true })
        .sort({ProjNo:1})
        .exec(function(err, collection) {
        res.send(collection);
    })
};

exports.updateProject = function(req, res) {
    Project.update({ProjNo:req.params.id}, {$set: req.body}, function (err) {
        if (err) return handleError(err);
        res.send(200);
    });
};


exports.deleteProject = function(req, res) {
    Project.remove({ProjNo:req.params.id}, function (err) {
        if (err) return handleError(err);
        res.send(200);
    });
};

exports.createProject = function(req, res, next) {
    Project.create(req.body, function(err, proj) {
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

exports.getProjectById = function(req, res) {
    Project.findOne({ProjNo:req.params.id}).exec(function(err, project) {
        res.send(project);
    })
};

exports.getProjectNameById = function(req, res) {
    Project.findOne({ProjNo:req.params.id}, {ProjNo:true, Title:true, _id:false}).exec(function(err, project) {
        res.send(project);
    })
};