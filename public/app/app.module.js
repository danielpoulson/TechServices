(function() {

    'use strict';

angular.module('app', ['app.core', 'app.layout', 'app.widgets', 'app.dashboard']);
    
    angular.module('app').config(function($stateProvider, $locationProvider, $urlRouterProvider,$httpProvider ) {
  var routeRoleChecks = {
    admin: {
      auth: function (AuthService) {
        return AuthService.authorizeCurrentUserForRoute('admin');
      }
    },
    user: {
      auth: function (AuthService) {
        return AuthService.authorizeAuthenticatedUserForRoute();
      }
    }
  };

    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';


  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise("/");

  $stateProvider
      .state("dashboard", {
        url: "/",
        templateUrl: "/app/dashboard/dashboard.html",
        controller: 'dashboard as vm'
      })

      .state("deviationList", {
        url: "/deviations",
        templateUrl: "/app/deviations/devListView.html",
        controller: 'DevListCtrl as vm'
      })
      .state("deviationEdit", {
        abstract: true,
        url: "/deviations/:id",
        templateUrl: "/app/deviations/devEditView.html",
        controller: "DevEditCtrl as vm"
      })
      .state("deviationEdit.detail", {
        url: "/detail",
        templateUrl: "/app/deviations/devDetailView.html"
      })
      .state("deviationEdit.invest", {
        url: "/invest",
        templateUrl: "/app/deviations/devInvestView.html"
      })
      .state("deviationEdit.log", {
        url: "/log",
        templateUrl: "/app/deviations/devLogView.html"
      })
      .state("deviationEdit.tasks", {
          url: "/tasks",
          templateUrl: "/app/tasks/task-list.html",
          controller: "TaskListCtrl as vm"
      })
      .state("deviationEdit.files", {
          url: "/files",
          templateUrl: "/app/deviations/devFileView.html"
      })
      .state("deviationsPrint", {
          url: "/deviations/print/:id",
          templateUrl: "/app/deviations/devPrintView.html",
          controller: "DevPrintCtrl as vm"
      })
      .state("tasks", {
          url: "/tasks/:id",
          templateUrl: "/app/tasks/task-list.html",
          controller: "TaskListCtrl as vm"
      })
      .state("profile", {
          url: "/profile/:id",
          templateUrl: "/app/account/profile.html",
          controller: "ProfileCtrl as vm",
          resolve: routeRoleChecks.admin
      })
      .state("signup", {
          url: "/signup",
          templateUrl: "/app/account/signup.html",
          controller: "mvSignupCtrl as vm"
      });

});

  angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$stateChangeError', function (evt, current, previous, rejection) {
      if (rejection === 'not authorized') {
        $location.path('/');
      }
    });
  });


})();



