/**
 * Created by root on 19/4/16.
 */
(function () {
    var injectParams = ['$sails',  '$rootScope'];
    var mainFactory = function ($sails,  $rootScope) {
        var serviceBase = '/api/v2/';
        var factory = {};
        /**
         *
         */
        factory.getAllData = function (serviceInput) {
            return $sails.post(serviceBase + "data/master/", serviceInput)
                .success(function (results) {
                    return results;
                })
                .error(function (data) {
                    alert('Problem in connection!');
                });
        };
        /**
         *
         */
        factory.getAppNewsFeedData = function (serviceInput) {
            return $sails.post(serviceBase + "data/health-news-view-all/", serviceInput)
                .success(function (results) {
                    return results;
                })
                .error(function (data) {
                    alert('Problem in connection!');
                });
        };


        /**
         * logout
         */
        factory.logout = function (serviceInput) {
            return $sails.post(serviceBase + "user/logout/", serviceInput)
                .success(function (results) {
                    return results;
                })
                .error(function (data) {
                    alert('Problem in connection!');
                });
        };



        factory.getEventCalendar = function () {
            return $sails.post(serviceBase + "data/get_event_calendar")
                .success(function (results) {
                    return results;
                })
                .error(function (data) {
                    alert('Problem in connection!');
                });
        };

        /***************** *************************************
         functionName:ContactUs
         inputJSON:
         outputJSON:
         Description:
         UseIn:UserController
         OwnerName: Root
         Date:    17/10/2016

         *******************************************************/
        factory.ContactUs = function(serviceInput){

            return $sails.post(serviceBase + "data/home-service/", serviceInput)
                .success(function (results) {
                    return results;
                })
                .error(function (data) {
                    alert('Problem in connection!');
                });
        };

//*******************************new url*************************************//

        factory.premiumPatientToAskQuestion = function (serviceInput) {
            return $sails.post(serviceBase + "patient/ask_question", serviceInput)
                .success(function (results) {
                    return results;
                })
                .error(function (data) {
                    alert('Problem in connection!');
                });
        };


        factory.getAskQuestionList = function (serviceInput) {
            return $sails.post(serviceBase + "patient/get_ask_question_by_patient_id", serviceInput)
                .success(function (results) {
                    return results;
                })
                .error(function (data) {
                    alert('Problem in connection!');
                });
        };


        factory.getNewsFeedByCategory = function (serviceInput) {
            return $sails.post(serviceBase + "data/get_news_feed_by_category", serviceInput)
                .success(function (results) {
                    return results;
                })
                .error(function (data) {
                    alert('Problem in connection!');
                });
        };


        factory.globalSearch = function (serviceInput) {
            return $sails.post(serviceBase + "search/global-search", serviceInput)
                .success(function (results) {
                    return results;
                })
                .error(function (data) {
                    alert('Problem in connection!');
                });
        };






        return factory;
    };
    mainFactory.$inject = injectParams;
    angular.module('hfuapp')
        .factory('mainService', mainFactory);
})();
