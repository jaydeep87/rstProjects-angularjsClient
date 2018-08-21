/**
 * Created by Lenovo on 02-08-2018.
 */
(function () {
    var injectParams = ['$http', '$rootScope'];
    var userDashboardFactory = function ($http, $rootScope) {

        var apiVersion = $rootScope.clientSettings.serverBaseUrl + 'rst/api-v1/';
        var config = $rootScope.clientSettings.config;
        var factory = {};
        factory.serverBaseUrl = $rootScope.clientSettings.serverBaseUrl;


        /***************** *************************************
         functionName:getUserProfileById
         inputJSON:
         outputJSON:
         Description:
         UseIn:userDashboardController
         OwnerName: Jaydeep Verma
         Date:   10/08/2018

         *******************************************************/
        factory.getUserProfileById = function (serviceInput) {
            return $http.post(apiVersion + "user/user-profile", serviceInput)
                .success(function (resultData) {
                    return resultData;
                })
                .error(function (err) {
                    return err;
                });

        };



        /***************** *************************************
         functionName:getUserContactById
         inputJSON:
         outputJSON:
         Description:
         UseIn:userDashboardController
         OwnerName: Jaydeep Verma
         Date:   14/08/2018

         *******************************************************/
        factory.getUserContactById = function (serviceInput) {
            return $http.post(apiVersion + "user/get-user-bgc-contact-details", serviceInput)
                .success(function (resultData) {
                    return resultData;
                })
                .error(function (err) {
                    return err;
                });

        };

        /***************** *************************************
         functionName:createUpdateUserBGCPersonalProfile
         inputJSON:
         outputJSON:
         Description:
         UseIn:userDashboardController
         OwnerName: Jaydeep Verma
         Date:   10/08/2018

         *******************************************************/
        factory.createUpdateUserBGCPersonalProfile = function (serviceInput) {
            return $http.post(apiVersion + "user/create-update-user-bgc-personal-profile", serviceInput)
                .success(function (resultData) {
                    return resultData;
                })
                .error(function (err) {
                    return err;
                });

        };

  /***************** *************************************
         functionName:updateUserBGCContactDetails
         inputJSON:
         outputJSON:
         Description:
         UseIn:userDashboardController
         OwnerName: Jaydeep Verma
         Date:   10/08/2018

         *******************************************************/
        factory.updateUserBGCContactDetails = function (serviceInput) {
            return $http.post(apiVersion + "user/update-user-bgc-contact-details", serviceInput)
                .success(function (resultData) {
                    return resultData;
                })
                .error(function (err) {
                    return err;
                });

        };

        /***************** *************************************
         functionName:uploadUserProfileImage
         inputJSON:
         outputJSON:
         Description:
         UseIn:
         OwnerName:Jaydeep Verma
         Date: 13/08/2018

         *******************************************************/
        factory.uploadUserProfileImage = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('profile_image', file[0]);
            return $http.post(uploadUrl, fd, {headers: {'Content-Type': undefined}}).success(function (result) {
                return result;
            })
                .error(function (err) {
                    return(err);
                });
        };



        /***************** *************************************
         functionName:getUserEducationById
         inputJSON:
         outputJSON:
         Description:
         UseIn:userDashboardController
         OwnerName: Jaydeep Verma
         Date:   20/08/2018

         *******************************************************/
        factory.getUserEducationById = function (serviceInput) {
            return $http.post(apiVersion + "user/get-user-bgc-education-details", serviceInput)
                .success(function (resultData) {
                    return resultData;
                })
                .error(function (err) {
                    return err;
                });

        };

        /***************** *************************************
         functionName:updateUserBGCEducationDetails
         inputJSON:
         outputJSON:
         Description:
         UseIn:userDashboardController
         OwnerName: Jaydeep Verma
         Date:   20/08/2018

         *******************************************************/
        factory.updateUserBGCEducationDetails = function (serviceInput) {
            return $http.post(apiVersion + "user/update-user-bgc-education-details", serviceInput)
                .success(function (resultData) {
                    return resultData;
                })
                .error(function (err) {
                    return err;
                });

        };

        /***************** *************************************
         functionName:getUserEmploymentById
         inputJSON:
         outputJSON:
         Description:
         UseIn:userDashboardController
         OwnerName: Jaydeep Verma
         Date:   20/08/2018

         *******************************************************/
        factory.getUserEmploymentById = function (serviceInput) {
            return $http.post(apiVersion + "user/get-user-bgc-employment-details", serviceInput)
                .success(function (resultData) {
                    return resultData;
                })
                .error(function (err) {
                    return err;
                });

        };





        return factory;
    };
    userDashboardFactory.$inject = injectParams;
    angular.module('rst_app')
        .factory('userDashboardService', userDashboardFactory);
})();
