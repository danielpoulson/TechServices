(function () {
    'use strict';

    var serviceId = 'mvFile';
    angular.module('app').factory(serviceId, ['$resource', mvFile  ]);

    function mvFile($resource) {


        var fileRes = $resource('/api/files/:fileId', {fileId: '@id'},
            {'update': {method: 'PUT', params: {fileId: '@id'}}});


        var service = {
            deleteFile: deleteFile,
            //getFile: getFile,
            getFiles: getFiles,
            //getFileCount: getFileCount,
            //getDeviationFiles: getDeviationFiles,
            //saveFile: saveFile,
            saveNewFile: saveNewFile
        };

        return service;

        function deleteFile (FileId) {
            return FileResource.delete({FileId: FileId});
        }

        function getFiles(fileId) {
            var files = fileRes.query({fileId: fileId});

            return files;

        }

        function saveNewFile(file) {
            return fileRes.save(file);
        }



    }

})();
