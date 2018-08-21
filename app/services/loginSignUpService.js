/**
 * Created by Lenovo on 02-08-2018.
 */
(function () {
    var injectParams = ['$http', '$rootScope'];
    var loginSignUpFactory = function ($http, $rootScope) {

        var apiVersion = $rootScope.clientSettings.serverBaseUrl + 'rst/api-v1/';
        var config = $rootScope.clientSettings.config;
        var factory = {};
        factory.serverBaseUrl = $rootScope.clientSettings.serverBaseUrl;

        /***************** *************************************
         functionName:userLogin
         inputJSON:
         outputJSON:
         Description:
         UseIn:userLoginController
         OwnerName: Jaydeep Verma
         Date:   02/08/2018

         *******************************************************/
        factory.userLogin = function (serviceInput) {
            return $http.post(apiVersion + "user/login", serviceInput)
                .success(function (resultData) {
                    return resultData;
                })
                .error(function (err) {
                    return err;
                });

        };

        return factory;
    };
    loginSignUpFactory.$inject = injectParams;
    angular.module('rst_app')
        .factory('LoginSignUpService', loginSignUpFactory);
})();
