
exports.downloadFile = function(req, res) {
    var filename = req.params.file;
    var file = config.rootPath + 'uploads/' + filename;
    console.log(file);
    res.download(file);
    };

exports.uploadFile = function(req, res) {
    console.log(req.files);
    res.send(200);
};