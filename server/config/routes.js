var auth = require('./auth');
var users = require('../controllers/users');
var projects = require('../controllers/projects');
var projcounts = require('../controllers/projcounts');
var tasks = require('../controllers/tasks');
var mongoose = require('mongoose');
var files = require('../controllers/files');
var User = mongoose.model('User');

module.exports = function(app, config) {
//*************User Routes************************
  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);
  //app.put('/api/users', users.updateUser);
  app.get('/api/allusers', users.getAllUsers);
  app.get('/api/users/admin/:id', users.getUsersById);
  app.put('/api/users/admin/:id', users.updateAdminUser);
  app.delete('/api/users/admin/:id', users.deleteUser);

  //*************Project Routes************************
//Projects
  app.get('/api/projects/:status', projects.getProjects);
  app.get('/api/project/:id', projects.getProjectById);
  app.get('/api/projectName/:id', projects.getProjectNameById);

  app.put('/api/project/:id', projects.updateProject);
  app.post('/api/project', projects.createProject);
  app.delete('/api/project/:id', projects.deleteProject);

  app.get('/api/projectNo/:year', projcounts.getProjYear);
  app.post('/api/projectNo/:year', projcounts.newProjYear);
  app.put('/api/projectNo/:year', projcounts.incProjNo);


  //Task

  app.get('/api/deviation/tasks/:id', tasks.getDeviationTaskList);
//  app.get('/api/tasks', tasks.getTasks);
  app.get('/api/alltasks/:status/:capa', tasks.getTasks);
  app.get('/api/tasks/:id', tasks.getTaskById);
  app.put('/api/tasks/:id', tasks.updateTask);
  app.post('/api/tasks', tasks.createTask);
  app.delete('/api/tasks/:id', tasks.deleteTask);


  //**********File function ***************
  app.get('/server/upload/:file', files.downloadFile);
  app.get('/api/files/:files', files.getFiles);
  //app.post('/api/files', files.createFile);
  app.post('/server/upload', files.uploadFile);
  app.delete('/server/delete/:file', files.deletefile);

//**********Dashboard function ***************

    // app.get('/api/dashboard/class', deviations.getClass);
    // app.get('/api/dashboard/summary', deviations.getDashboard);



//********* Helper Routes**********
  app.get('/api/taskcount/:id', tasks.getTaskCount);

//  app.get('/partials/*', function(req, res) {
//    res.render('../../public/app/' + req.params[0]);
//  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });
    
// application -------------------------------------------------------------
//	app.get('*', function(req, res) {
//		res.sendfile(config.appViews + 'layout.html'); // load the single view file (angular will handle the page changes on the front-end)
//	});    

  app.get('*', function(req, res) {
      //console.log(req.user);
    res.render('index', {
      bootstrappedUser: req.user
        
    });
      
  });
};