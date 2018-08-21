/**
 * Created by Lenovo on 06-08-2018.
 */
(function () {
    var injectParams = ['$scope', '$rootScope','$location','DebugService','LocalStorageService','adminUserService'];
    var adminUserController = function ($scope, $rootScope,$location,DebugService,LocalStorageService,adminUserService) {

        $scope.todayDate = new Date();
        $rootScope.isAdminLogin = true;
        $scope.userCount = 0;
        $scope.showUserType = "Active";
        var self = this;

        this.getActiveUserList = function(){
            //alert('called');
            if(LocalStorageService.get('authToken')){
                $scope.showUserType = "Active";
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $rootScope.loader = true;
                adminUserService.getActiveUserList($scope.inputData).success(function (result) {
                    LocalStorageService.set('current_url', $location.path());
                  //  DebugService.logData(result);
                    $rootScope.loader = false;
                    if (result.statusCode == 200) {
                        $scope.activeUserList = result.data;
                        $scope.userCount = result.data.length ? result.data.length : 0;

                    } else {
                        $rootScope.showHideErrorMessage(result.statusMessage);
                        //DebugService.logData(result);
                    }
                })
            }
            else
            {
                $location.path('/');
            }

        };


        this.getInActiveUserList = function(){
            if(LocalStorageService.get('authToken')){
                $scope.showUserType = "Inactive";
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $rootScope.loader = true;
                adminUserService.getInActiveUserList($scope.inputData).success(function (result) {
                    LocalStorageService.set('current_url', $location.path());
                   // DebugService.logData(result);
                    $rootScope.loader = false;
                    if (result.statusCode == 200) {
                        $scope.inActiveUserList = result.data;
                        $scope.userCount = result.data.length ? result.data.length : 0;

                    } else {
                        $rootScope.showHideErrorMessage(result.statusMessage);
                        //DebugService.logData(result);
                    }
                })

            }
            else
            {
                $location.path('/');
            }

        };


        this.deactivateUser = function(id){
            if(LocalStorageService.get('authToken') && id){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.id = id;
                $rootScope.loader = true;
                adminUserService.deactivateUser($scope.inputData).success(function (result) {
                  //  DebugService.logData(result);
                    $rootScope.loader = false;
                    if (result.statusCode == 200) {
                        $rootScope.showHideSuccessMessage(result.statusMessage);
                        self.getActiveUserList();

                    } else {
                        $rootScope.showHideErrorMessage(result.statusMessage);
                        //DebugService.logData(result);
                    }
                })

            }
            else
            {
                $location.path('/');
            }
        };


        this.activateUser = function(id){
            if(LocalStorageService.get('authToken') && id){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.id = id;
                $rootScope.loader = true;
                adminUserService.activateUser($scope.inputData).success(function (result) {
                   // DebugService.logData(result);
                    $rootScope.loader = false;
                    if (result.statusCode == 200) {
                        $rootScope.showHideSuccessMessage(result.statusMessage);
                        self.getInActiveUserList();

                    } else {
                        $rootScope.showHideErrorMessage(result.statusMessage);
                        //DebugService.logData(result);
                    }
                })

            }
            else
            {
                $location.path('/');
            }

        };


        $scope.userSignUpModel = {
            fName: '',
            mName: '',
            lName: '',
            mobile: '',
            email: '',
            gender: 'male',
            password: '',
            confirmPassword: '',
            createdBy:LocalStorageService.get('userId')
        };
        $scope.initiateModel = function(){
            $scope.userSignUpModel.accountCreatedBy = LocalStorageService.get('userId');
            LocalStorageService.set('current_url',$location.path());
        };

        this.signUpUser = function(){
            //DebugService.logData($scope.userSignUpModel);
            if(LocalStorageService.get('authToken')){
                $scope.userSignUpModel.authToken = LocalStorageService.get('authToken');
                $rootScope.loader = true;
                adminUserService.signUpUser($scope.userSignUpModel).success(function (result) {
                  //  DebugService.logData(result);
                    $rootScope.loader = false;
                    if (result.statusCode == 200) {
                        $location.path('/admin-user-management');

                    } else {
                        $rootScope.showHideErrorMessage(result.statusMessage);
                        //DebugService.logData(result);
                    }
                })

            }
            else
            {
                $location.path('/');
            }
        };





    };
    adminUserController.$inject = injectParams;
    angular.module('rst_app')
        .controller('adminUserController', adminUserController)
})();