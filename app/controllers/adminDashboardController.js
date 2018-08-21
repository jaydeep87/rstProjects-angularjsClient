/**
 * Created by Lenovo on 01-08-2018.
 */
(function () {
    var injectParams = ['$scope', '$rootScope','LocalStorageService'];
    var dashboardController = function ($scope, $rootScope,LocalStorageService) {

        $scope.todayDate = new Date();
        $rootScope.isAdminLogin = false;
        $rootScope.isUserLogin = true;

    };
    dashboardController.$inject = injectParams;
    angular.module('rst_app')
        .controller('dashboardController', dashboardController)
})();