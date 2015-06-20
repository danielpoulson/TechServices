var Task = require('mongoose').model('Task');

exports.getTasks = function(req, res) {
    var status = req.params.status;
    var milestone = req.params.milestone;
    Task.find({TKStat: {$lt : status}, TKMile: {$gte : milestone}},{ProjectId:true, TKName:true, TKTarg:true, TKStart:true, TKChamp:true, TKStat:true, TKMile:true})
        .sort({TKTarg:1}).exec(function(err, collection) {
        res.send(collection);
    });
};

exports.getProjectTaskList = function(req, res) {
    Task.find({ProjectId:req.params.id}, function(err, collection) {
        res.send(collection);
    });
};

exports.updateTask = function(req, res) {
    var query = {_id: req.params.id};
    Task.findOneAndUpdate(query, req.body, function (err) {
        if (err) return handleError(err);
        res.send(200);
    });
};


exports.deleteTask = function(req, res) {
    Task.remove({_id:req.params.id}, function (err) {
        if (err) return handleError(err);
        res.send(200);
    });
};

exports.createTask = function(req, res, next) {
    Task.create(req.body, function(err, task) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Task');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(200);
    });
};

exports.getTaskById = function(req, res) {
    Task.findOne({_id:req.params.id}).exec(function(err, task) {
        res.send(task);
    });
};

exports.getTaskCount = function(req,res){
    Task.count({ProjectId:req.params.id}, function(err, taskCount){
        res.send(taskCount.toString());
    });
};