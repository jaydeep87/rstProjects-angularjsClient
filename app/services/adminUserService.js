/**
 * Created by Lenovo on 02-08-2018.
 */
(function () {
    var injectParams = ['$http', '$rootScope'];
    var adminUserFactory = function ($http, $rootScope) {

        var apiVersion = $rootScope.clientSettings.serverBaseUrl + 'rst/api-v1/';
        var config = $rootScope.clientSettings.config;
        var factory = {};
        factory.serverBaseUrl = $rootScope.clientSettings.serverBaseUrl;

        /***************** *************************************
         functionName:getActiveUserList
         inputJSON:
         outputJSON:
         Description:
         UseIn:adminUserController
         OwnerName: Jaydeep Verma
         Date:   06/08/2018

         *******************************************************/
        factory.getActiveUserList = function (serviceInput) {
            return $http.post(apiVersion + "user/active-users-list", serviceInput)
                .success(function (resultData) {
                    return resultData;
                })
                .error(function (err) {
                    return err;
                });

        };

        /***************** *************************************
         functionName:getInActiveUserList
         inputJSON:
         outputJSON:
         Description:
         UseIn:adminUserController
         OwnerName: Jaydeep Verma
         Date:   06/08/2018

         *******************************************************/
        factory.getInActiveUserList = function (serviceInput) {
            return $http.post(apiVersion + "user/in-active-users-list", serviceInput)
                .success(function (resultData) {
                    return resultData;
                })
                .error(function (err) {
                    return err;
                });

        };


        /***************** *************************************
         functionName:activateUser
         inputJSON:
         outputJSON:
         Description:
         UseIn:adminUserController
         OwnerName: Jaydeep Verma
         Date:   06/08/2018

         *******************************************************/
        factory.activateUser = function (serviceInput) {
            return $http.post(apiVersion + "user/activate-user", serviceInput)
                .success(function (resultData) {
                    return resultData;
                })
                .error(function (err) {
                    return err;
                });

        };

        /***************** *************************************
         functionName:activateUser
         inputJSON:
         outputJSON:
         Description:
         UseIn:adminUserController
         OwnerName: Jaydeep Verma
         Date:   06/08/2018

         *******************************************************/
        factory.deactivateUser = function (serviceInput) {
            return $http.post(apiVersion + "user/deactivate-user", serviceInput)
                .success(function (resultData) {
                    return resultData;
                })
                .error(function (err) {
                    return err;
                });

        };


        /***************** *************************************
         functionName:signUpNewUser
         inputJSON:
         outputJSON:
         Description:
         UseIn:adminUserController
         OwnerName: Jaydeep Verma
         Date:   07/08/2018

         *******************************************************/
        factory.signUpUser = function (serviceInput) {
            return $http.post(apiVersion + "user/sign-up", serviceInput)
                .success(function (resultData) {
                    return resultData;
                })
                .error(function (err) {
                    return err;
                });

        };



        return factory;
    };
    adminUserFactory.$inject = injectParams;
    angular.module('rst_app')
        .factory('adminUserService', adminUserFactory);
})();
