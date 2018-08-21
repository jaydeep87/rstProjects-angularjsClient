/**
 * Created by Lenovo on 01-08-2018.
 */
(function () {
    var injectParams = ['$scope', '$rootScope','$location','$timeout','LocalStorageService'];
    var mainController = function ($scope, $rootScope,$location,$timeout,LocalStorageService) {


        $scope.todayDate = new Date();
        $rootScope.isAdminLogin = false;
        $rootScope.clientSettings = clientSettings;
        $rootScope.loader = false;
        $rootScope.responseMessage = false;
        $rootScope.errorResponseMessage = false;

        $rootScope.userData = {};
        if(LocalStorageService.get('loggedInUserData')){
            $rootScope.userData = LocalStorageService.get('loggedInUserData');
            if($rootScope.userData.isAdmin){
                if(LocalStorageService.get('current_url')){
                    $location.path(LocalStorageService.get('current_url'));
                }
                else
                {
                    $location.path('/admin-dashboard');
                }

            }
            else
            {
                if(LocalStorageService.get('current_url')) {
                    $location.path(LocalStorageService.get('current_url'));
                }
                else{
                    $location.path('/user-bgc?tab_id=1');
                }
            }
        }

        /***************** *************************************
         functionName:showHideSuccessMessage
         inputJSON:
         outputJSON:
         Description:
         UseIn:all
         OwnerName: Jaydeep Verma
         Date:   02/08/2018

         *******************************************************/
        $rootScope.showHideSuccessMessage = function(message){
            $rootScope.responseMessage = true;
            $rootScope.responseMessageText = message;
            $timeout(function () {
                $rootScope.responseMessage = false;
            },2000);
        };

        /***************** *************************************
         functionName:showHideErrorMessage
         inputJSON:
         outputJSON:
         Description:
         UseIn:all
         OwnerName: Jaydeep Verma
         Date:   02/08/2018

         *******************************************************/

        $rootScope.showHideErrorMessage = function (errorMessage) {
            $rootScope.errorResponseMessage = false;
            if (errorMessage) {
                $rootScope.errorResponseMessage = true;
                $rootScope.errorMessageText = errorMessage;
                $timeout(function () {
                    $rootScope.errorResponseMessage = false;
                },5000);
            }
        };

        /***************** *************************************
         functionName:logout
         inputJSON:
         outputJSON:
         Description:
         UseIn:all
         OwnerName: Jaydeep Verma
         Date:   02/08/2018

         *******************************************************/

        $scope.logout = function () {
            LocalStorageService.clear();
            $location.path('/');
        };


    };
    mainController.$inject = injectParams;
    angular.module('rst_app')
        .controller('mainController', mainController);
})();

