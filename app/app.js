var app = angular.module('rst_app', ['ngRoute']);
app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    //$locationProvider.html5Mode(false).hashPrefix('!');
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: './app/template/login.tpl.html',
            controller: 'userLoginController as login'
        })
        .when('/login', {
            templateUrl: './app/template/login.tpl.html',
            controller: 'userLoginController as login'
        })
        .when('/user-dashboard', {
            //templateUrl: './app/template/user/user-base.tpl.html',
            templateUrl: './app/template/user/user-bgc.html',
            controller:  'userDashboardController as userDashboard'
        })
        .when('/user-bgc', {
            //templateUrl: './app/template/user/user-bgc.tpl.html',
            templateUrl: './app/template/user/user-bgc.html',
            controller:  'userDashboardController as userDashboard'
        })
        .when('/admin-dashboard', {
            templateUrl: './app/template/admin/admin-base.tpl.html',
            controller:  'dashboardController'
        })
        .when('/admin-user-management', {
            templateUrl: './app/template/admin/user-management.tpl.html',
            controller:  'adminUserController as userManagement'
        })
        .when('/admin-user-sign-up', {
            templateUrl: './app/template/admin/user-sign-up.tpl.html',
            controller:  'adminUserController as userManagement'
        })
        .when('/admin-employee-management', {
            templateUrl: './app/template/admin/employee-management.tpl.html',
            //controller:  'dashboardController'
        })
        .when('/admin-shift-schedule', {
            templateUrl: './app/template/admin/shift-schedule.tpl.html',
            //controller:  'dashboardController'
        })

        //.when('/tags/:tagId', {
        //  templateUrl: '/partials/template2.html',
        //  controller:  'ctrl2'
        //})
        //.when('/another', {
        //  templateUrl: '/partials/template1.html',
        //  controller:  'ctrl1'
        //})
        .otherwise({redirectTo: '/'});
}]);