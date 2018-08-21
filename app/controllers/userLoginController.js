/**
 * Created by Lenovo on 01-08-2018.
 */
(function () {
    var injectParams = ['$scope', '$rootScope','$location','LoginSignUpService','DebugService','LocalStorageService'];
    var userLoginController = function ($scope, $rootScope,$location,LoginSignUpService,DebugService,LocalStorageService) {

        $scope.todayDate = new Date();
        $rootScope.isAdminLogin = false;
        $rootScope.isUserLogin = false;
        this.userLoginModel = {
            'emailOrMobile':"",
            'password':"",
            'isAdmin':false
        };

        /***************** *************************************
         functionName:userLogin
         inputJSON:
         outputJSON:
         Description:
         UseIn:login.tpl.html
         OwnerName: Jaydeep Verma
         Date:   02/08/2018

         *******************************************************/

        this.userLogin = function(){
            if(this.userLoginModel.emailOrMobile && this.userLoginModel.password){
                $rootScope.loader = true;
                LoginSignUpService.userLogin(this.userLoginModel).success(function (result) {
                  //  DebugService.logData(result);
                    $rootScope.loader = false;
                    if (result.statusCode == 200) {
                        $rootScope.userData = result.data;
                        LocalStorageService.set('loggedInUserData',result.data);
                        LocalStorageService.set('authToken',result.authToken);
                        LocalStorageService.set('userId',result.data.userId);
                        if(result.data.isAdmin){
                            $location.path('/admin-dashboard');
                            LocalStorageService.set('current_url','/admin-dashboard');
                        }
                        else
                        {
                            $location.path('/user-dashboard');
                            LocalStorageService.set('current_url','/user-dashboard?tab_id=1');
                        }

                    } else {
                        $rootScope.showHideErrorMessage(result.statusMessage);
                        //DebugService.logData(result);
                    }
                })

            }
        };

    };
    userLoginController.$inject = injectParams;
    angular.module('rst_app')
        .controller('userLoginController', userLoginController)
})();