(function() {
    'use strict';

    angular
        .module('app')
        .directive('dpFiles', dpFiles);

    /* @ngInject */
    function dpFiles (mvFile, $stateParams, FileUploader, $http, $window, IdService, mvNotifier) {
        //Usage:

        var directive = {
        scope: {},
        templateUrl:"/app/files/dpFiles.html",
        controllerAs: "ctr",
        controller: function() {

            var ctr = this;
            var  username = IdService.currentUser.firstName + ' ' + IdService.currentUser.lastName;


            ctr.getFiles = getFiles;
            ctr.saveFileText = saveFileText;
            ctr.downloadfile = downloadfile;
            ctr.deletefile = deletefile;


            ctr.uploader = new FileUploader({
                url: '/server/upload',
                formData: [
                    {dpUser:username},
                    {dvNo:$stateParams.id}
                ],
                onCompleteItem : fileLoaded
            });


            function fileLoaded(){
                getFiles();
                mvNotifier.notify('Your File has been uploaded!');
            }


                activate();

            function activate() {
                getFiles();
            }

            function getFiles() {
                //if(IdService.currentUser) {
                var val = $stateParams.id;

                return mvFile.getFiles(val)
                    .$promise.then(function (data) {

                        ctr.fstext = data;

                    });
            }


            function saveFileText () {
                //console.log("save new file");
                var fileText = {
                    "fsFileName" : "newdoc",
                    "fsFileExt" : "txt",
                    "fsAddedBy" : "Daniel Poulson",
                    "fsDevNo" : "DV150001"
                };

                mvFile.saveNewFile(fileText)
                    .$promise.then(success, failed);
            }

            function downloadfile(file){
                window.location = '/server/upload/' + file;
            }

            function deletefile(filename){
                if ($window.confirm('Are you sure you want to delete this?')) {
                    $http.delete('/server/delete/' + filename);
                    getFiles();
               }
                
            }
        }

        };
        return directive;
    }
})();