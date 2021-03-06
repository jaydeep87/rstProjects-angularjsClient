/**
 * Created by Lenovo on 07-08-2018.
 */
(function () {
    var injectParams = ['$scope', '$rootScope','$location','$routeParams','DebugService','LocalStorageService','userDashboardService'];
    var userDashboardController = function ($scope, $rootScope,$location,$routeParams,DebugService,LocalStorageService,userDashboardService) {

        $scope.todayDate = new Date();
        $rootScope.isUserLogin = true;
        //var apiVersion = $rootScope.clientSettings.serverBaseUrl + 'rst/api-v1/';
        var apiVersion = 'http://localhost:8080/rst/api-v1/';
        var self = this;


        /***************** *************************************
         functionName:userDashboard
         inputJSON:
         outputJSON:
         Description: add bgc form
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   07/08/2018

         *******************************************************/


        $scope.userProfileModel = {};

        /***************** *************************************
         functionName:getUserProfile
         inputJSON:
         outputJSON:
         Description: add bgc form
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   10/08/2018

         *******************************************************/

        this.getUserProfile = function(){
            if(LocalStorageService.get('authToken') && LocalStorageService.get('userId')){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.userId = LocalStorageService.get('userId');
                $scope.inputData.mobile = $rootScope.userData.mobile;
                $scope.inputData.email = $rootScope.userData.email;
                $rootScope.loader = true;
                userDashboardService.getUserProfileById($scope.inputData).success(function (result) {
                     //DebugService.logData(result);
                    $rootScope.loader = false;
                    if (result.statusCode == 200) {
                        $scope.userProfileModel = result.data;
                        if(!result.data.isActive){
                            LocalStorageService.set('user_bgc_id', result.data._id);
                            $scope.userProfileModel.serverBaseURL = result.serverBaseURL;
                            $scope.userProfileModel.isBGC = true;
                            LocalStorageService.set('isBGC', true);
                        }
                        else
                        {
                            $scope.userProfileModel.isBGC = false;
                        }
                        LocalStorageService.set('current_url', $location.path());
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

        /***************** *************************************
         functionName:updateBGCPersonalProfile
         inputJSON:
         outputJSON:createUpdateUserBGCPersonalProfile
         Description: add bgc form
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   10/08/2018

         *******************************************************/

        this.updateBGCPersonalProfile = function(){
            if(LocalStorageService.get('authToken') && LocalStorageService.get('userId')){
                $scope.inputData = {};
                $scope.inputData = $scope.userProfileModel;
                $scope.inputData.authToken = LocalStorageService.get('authToken');
                $scope.inputData.userId = LocalStorageService.get('userId');
                $scope.inputData.mobile = $rootScope.userData.mobile;
                $scope.inputData.email = $rootScope.userData.email;
                $scope.inputData.dob = $('.datetimepicker1').val();
                if($scope.inputData.dob){
                    $rootScope.loader = true;
                    userDashboardService.createUpdateUserBGCPersonalProfile($scope.inputData).success(function (result) {
                        // DebugService.logData(result);
                        $rootScope.loader = false;
                        if (result.statusCode == 200) {
                            LocalStorageService.set('current_url', $location.path());
                            $rootScope.showHideSuccessMessage(result.statusMessage);
                            self.getUserProfile();
                        } else {
                            $rootScope.showHideErrorMessage(result.statusMessage);
                            //DebugService.logData(result);
                        }
                    })
                }
                else
                {
                    $rootScope.showHideErrorMessage("Please select your DOB....!!!");
                }

            }
            else
            {
                $location.path('/');
            }

        };


        /***************** *************************************
         functionName:uploadUserProfileImage
         inputJSON:
         outputJSON:
         Description: upload profile image
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   14/08/2018

         *******************************************************/

        this.uploadUserProfileImage = function (file) {
            var ext = file[0].name.match(/\.(.+)$/)[1];
            if(angular.lowercase(ext) ==='jpg' || angular.lowercase(ext) ==='jpeg' || angular.lowercase(ext) ==='png'){
                if (file.length < -1) return false;
                $scope.loading = true;
                var authToken = LocalStorageService.get('authToken');
                var userId = $scope.userProfileModel._id;
                //alert(userId);
                var uploadUrl = apiVersion+'user/upload-user-profile-image/' + authToken+ '/' + userId;
                console.log(uploadUrl);
                userDashboardService.uploadUserProfileImage(file, uploadUrl).success(function (result) {
                    $scope.loading = false;
                    // DebugService.logData(result);
                    if (result.statusCode == 200) {
                        angular.element("input[type='file']").val(null);
                        $rootScope.showHideSuccessMessage(result.statusMessage);
                        self.getUserProfile();
                    }
                    else {
                        $rootScope.errorMessageFunction(result);
                        // DebugService.logData(result.statusMessage);
                    }
                });
            }
            else{
                alert("Please select Valid File...!!!");
            }
        };





        /***************** *************************************
         functionName:getOnlyDate
         inputJSON:
         outputJSON:
         Description: initiate date in datepicker
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   14/08/2018

         *******************************************************/

        $scope.getOnlyDate = function () {
            var date = new Date();
            date.setFullYear( date.getFullYear() - 18 );
            $('.datetimepicker1').datetimepicker({
                format: 'L',
                maxDate: date
            });
        };



        /***************** *************************************
         functionName:getFutureDate
         inputJSON:
         outputJSON:
         Description: initiate date in datepicker
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   05/09/2018

         *******************************************************/

        $scope.getFutureDate = function () {
            var date = new Date();
            $('.datetimepicker2').datetimepicker({
                format: 'L',
                minDate: date
            });
        };

        /***************** *************************************
         functionName:getDurationDate
         inputJSON:
         outputJSON:
         Description: initiate date in datepicker
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   14/08/2018

         *******************************************************/

        $scope.getDurationDate = function () {
            var date = new Date();
            $('.datetimepicker1').datetimepicker({
                format: 'L',
                maxDate: date
            });
        };

        /***************** *************************************
         functionName:getMonthYearDate
         inputJSON:
         outputJSON:
         Description: for passing course
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   20/08/2018

         *******************************************************/
          $scope.getMonthYearDate = function () {
            var maxDate = new Date();
            var minDate = new Date();
              minDate.setFullYear( minDate.getFullYear() - 60 );
              $('.datetimepicker1').datetimepicker({
                  viewMode: 'years',
                  format: 'MM/YYYY',
                  maxDate: maxDate,
                  minDate: minDate
              });
        };



        /***************** *************************************
         functionName:getUserProfile
         inputJSON:
         outputJSON:
         Description: add bgc form
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   10/08/2018

         *******************************************************/
        $scope.contactAddress = {
            'permanent':{
                "address": "",
                "addressType": "",
                "fromDate": "",
                "toDate": "",
                "landlord": "",
                "policeStation": "",
                "mobile": "",
                "landline": ""
            },
            'current':{
                "address": "",
                "addressType": "",
                "fromDate": "",
                "toDate": "",
                "landlord": "",
                "policeStation": "",
                "mobile": "",
                "landline": ""
            },
            'interMediate':{
                "address": "",
                "addressType": "",
                "fromDate": "",
                "toDate": "",
                "landlord": "",
                "policeStation": "",
                "mobile": "",
                "landline": ""
            }
        };

        this.getContactDetails = function(){
            if(LocalStorageService.get('authToken') && LocalStorageService.get('user_bgc_id')){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.bgcId =  LocalStorageService.get('user_bgc_id');
                $rootScope.loader = true;
                userDashboardService.getUserContactById($scope.inputData).success(function (result) {
                    //DebugService.logData(result);
                    $rootScope.loader = false;
                    if (result.statusCode == 200) {
                        if(result.data){
                            $scope.contactAddress = result.data;
                        }
                        LocalStorageService.set('current_url', $location.path());
                    } else {
                        $rootScope.showHideErrorMessage(result.statusMessage);
                        //DebugService.logData(result);
                    }
                })

            }
            else
            {
                LocalStorageService.clear();
                $location.path('/');
            }

        };


        /***************** *************************************
         functionName:getDifferenceBetweenDate
         inputJSON:
         outputJSON:
         Description:
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   17/08/2018

         *******************************************************/

        $scope.getDifferenceBetweenDate = function(d1, d2) {
            var fromDate = new Date(moment(d1, "DD/MM/YYYY"));
            var toDate = new Date(moment(d2, "DD/MM/YYYY"));
            // alert('fromDate :' +fromDate +"todate : "+toDate);
            var durationObj = {};
            if ((toDate.getTime() - fromDate.getTime()) > 1) {
                var diff = (toDate.getTime() - fromDate.getTime()) / (24 * 60 * 60 * 1000);
                if (diff > 365) {
                    durationObj.duration = diff;
                    durationObj.unit = diff / 365 + ' Years ' + (diff % 365) / 30 + "  Months";
                    return durationObj;
                }
                else if (diff < 365 && diff >= 30) {
                    durationObj.duration = diff;
                    durationObj.unit = diff / 30 + ' Months ' + (diff % 30) + "  Days";
                    return durationObj;
                }
                else {
                    durationObj.duration = diff;
                    durationObj.unit = diff + " Days";
                    return durationObj;
                }
            }
            else
            {
                durationObj.duration = -1;
                return durationObj;
            }
        };

        /***************** *************************************
         functionName:updateBGCContactDetails
         inputJSON:
         outputJSON:
         Description: add bgc form
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   10/08/2018

         *******************************************************/

        this.updateBGCContactDetails = function(){
            if(LocalStorageService.get('authToken') && LocalStorageService.get('user_bgc_id')){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.bgcId =  LocalStorageService.get('user_bgc_id');
                $scope.inputData.permanent = $scope.contactAddress.permanent;
                $scope.inputData.current = $scope.contactAddress.current;
                $scope.inputData.interMediate = $scope.contactAddress.interMediate;
                $scope.inputData.isSameAsPermanent = $scope.contactAddress.isSameAsPermanent;
                $scope.inputData.isIntermediateAddress = $scope.contactAddress.isIntermediateAddress;

                $scope.inputData.permanent.fromDate = $('#permanentFromDate').val();
                $scope.inputData.permanent.toDate = $('#permanentToDate').val();
                $scope.inputData.current.fromDate = $('#currentFromDate').val();
                $scope.inputData.current.toDate = $('#currentToDate').val();


                $scope.permanentDurationObj = $scope.getDifferenceBetweenDate($scope.inputData.permanent.fromDate, $scope.inputData.permanent.toDate);
                $scope.currentDurationObj = $scope.getDifferenceBetweenDate($scope.inputData.current.fromDate, $scope.inputData.current.toDate);
                if($scope.inputData.isIntermediateAddress){
                    $scope.inputData.interMediate.fromDate = $('#interMediateFromDate').val();
                    $scope.inputData.interMediate.toDate = $('#interMediateToDate').val();
                    $scope.interMediateDurationObj = $scope.getDifferenceBetweenDate($scope.inputData.interMediate.fromDate, $scope.inputData.interMediate.toDate);
                }
                if($scope.permanentDurationObj.duration > 0){
                    if($scope.currentDurationObj.duration > 0){
                        if($scope.inputData.isIntermediateAddress){
                            if($scope.interMediateDurationObj.duration > 0){
                                if($scope.inputData.permanent && $scope.inputData.current && $scope.inputData.interMediate){
                                    $rootScope.loader = true;
                                    userDashboardService.updateUserBGCContactDetails($scope.inputData).success(function (result) {
                                        // DebugService.logData(result);
                                        $rootScope.loader = false;
                                        if (result.statusCode == 200) {
                                            $rootScope.showHideSuccessMessage(result.statusMessage);
                                            self.getContactDetails();
                                        } else {
                                            $rootScope.showHideErrorMessage(result.statusMessage);
                                            //DebugService.logData(result);
                                        }
                                    })
                                }
                                else
                                {
                                    $rootScope.showHideErrorMessage("Please fill contact address details...!!!");
                                }
                            }
                        }
                        else
                        {
                            if($scope.inputData.permanent && $scope.inputData.current){
                                $rootScope.loader = true;
                                userDashboardService.updateUserBGCContactDetails($scope.inputData).success(function (result) {
                                    // DebugService.logData(result);
                                    $rootScope.loader = false;
                                    if (result.statusCode == 200) {
                                        $rootScope.showHideSuccessMessage(result.statusMessage);
                                        self.getContactDetails();
                                    } else {
                                        $rootScope.showHideErrorMessage(result.statusMessage);
                                        //DebugService.logData(result);
                                    }
                                })
                            }
                            else
                            {
                                $rootScope.showHideErrorMessage("Please fill contact address details...!!!");
                            }
                        }
                    }
                    else
                    {
                        $rootScope.showHideErrorMessage("Current Address From date should not be less than or equal to To date...!!!");
                    }
                }
                else {
                    $rootScope.showHideErrorMessage("Permanent Address From date should not be less than or equal to To date...!!!");
                }
            }
            else
            {
                $location.path('/');
            }

        };

        /***************** *************************************
         functionName:copyPermanentAddressToCurrent
         inputJSON:
         outputJSON:
         Description: add bgc form
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   10/08/2018

         *******************************************************/

        $scope.copyPermanentAddressToCurrent = function(value){
            //alert(value);
            if(value){
                $scope.contactAddress.current = $scope.contactAddress.permanent;
                $scope.contactAddress.current.fromDate = $('#permanentFromDate').val();
                $scope.contactAddress.current.toDate = $('#permanentToDate').val();
            }
            else
            {
                $scope.contactAddress.current = {
                    "address": "",
                    "addressType": "",
                    "fromDate": "",
                    "toDate": "",
                    "landlord": "",
                    "policeStation": "",
                    "mobile": "",
                    "landline": ""
                }
            }
        };


        /***************** *************************************
         functionName:getEducationDetails
         inputJSON:
         outputJSON:
         Description: add bgc form
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   20/08/2018

         *******************************************************/
        this.getEducationDetails = function(){
            if(LocalStorageService.get('authToken') && LocalStorageService.get('user_bgc_id')){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.bgcId =  LocalStorageService.get('user_bgc_id');
                $rootScope.loader = true;
                userDashboardService.getUserEducationById($scope.inputData).success(function (result) {
                  //  DebugService.logData(result);
                    $rootScope.loader = false;
                    if (result.statusCode == 200) {
                        if(result.data){
                            $scope.educationList = result.data;
                            if(result.data.length){
                                $scope.updateEducationDetails = result.data[0];
                            }
                        }
                        LocalStorageService.set('current_url', $location.path());
                    } else {
                        $rootScope.showHideErrorMessage(result.statusMessage);
                        //DebugService.logData(result);
                    }
                })

            }
            else
            {
                LocalStorageService.clear();
                $location.path('/');
            }

        };


        $scope.updateEducationDetails = {
            "course": "",
            "instituteOrCollege": "",
            "address": "",
            "universityName": "",
            "registrationNo": "",
            "passingMonthYear": "",
            "contactNo": "",
            "ssn": ""
        };

        this.updateBGCEducationDetails = function(){
            if(LocalStorageService.get('authToken') && LocalStorageService.get('user_bgc_id')){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.bgcId =  LocalStorageService.get('user_bgc_id');
                $scope.updateEducationDetails.passingMonthYear = $('#yearOfPassing').val();
                $scope.inputData.educationQualification =  [];
                $scope.inputData.educationQualification.push($scope.updateEducationDetails);
                if($scope.inputData.educationQualification.length && $scope.updateEducationDetails.passingMonthYear){
                    $rootScope.loader = true;
                    userDashboardService.updateUserBGCEducationDetails($scope.inputData).success(function (result) {
                        // DebugService.logData(result);
                        $rootScope.loader = false;
                        if (result.statusCode == 200) {
                            $rootScope.showHideSuccessMessage(result.statusMessage);
                            self.getEducationDetails();
                        } else {
                            $rootScope.showHideErrorMessage(result.statusMessage);
                            //DebugService.logData(result);
                        }
                    })
                }
                else
                {
                    $rootScope.showHideErrorMessage("Please fill all required fields...!!!");
                }
            }
            else
            {
                $location.path('/');
            }

        };

        /***************** *************************************
         functionName:getEmploymentDetails
         inputJSON:
         outputJSON:
         Description: add bgc form
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   20/08/2018

         *******************************************************/
        $scope.bgcEmploymentModel = {
            'isExperienced':true,
            'employmentList':[{
                'companyName':'',
                'companyAddressWithPin':'',
                'remuneration':'',
                'designation':'',
                'employeeId':'',
                'fromDate':'',
                'toDate':'',
                'period':'',
                'hrName':'',
                'hrContact':'',
                'hrEmail':'',
                'supervisorName':'',
                'supervisorContact':'',
                'supervisorEmail':'',
                'reasonForLeaving':''
            }],
            'canVerifyIn15Days':'No',
            'dateForVerification':''


        };

        this.getEmploymentDetails = function(){
            if(LocalStorageService.get('authToken') && LocalStorageService.get('user_bgc_id')){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.bgcId =  LocalStorageService.get('user_bgc_id');
                $rootScope.loader = true;
                userDashboardService.getUserEmploymentById($scope.inputData).success(function (result) {
                      //DebugService.logData(result);
                    $rootScope.loader = false;
                    if (result.statusCode == 200) {
                        if(result.data){
                            if(result.data.length){
                                $scope.bgcEmploymentModel.employmentList = result.data;
                            }
                            else
                            {
                                $scope.bgcEmploymentModel.employmentList = [];
                            }
                        }
                        $scope.bgcEmploymentModel.isExperienced = result.isExperienced;
                        $scope.bgcEmploymentModel.canVerifyIn15Days = result.canVerifyIn15Days;
                        $scope.bgcEmploymentModel.dateForVerification = result.dateForVerification;

                        LocalStorageService.set('current_url', $location.path());
                    } else {
                        $rootScope.showHideErrorMessage(result.statusMessage);
                        //DebugService.logData(result);
                    }
                })

            }
            else
            {
                LocalStorageService.clear();
                $location.path('/');
            }

        };


        /***************** *************************************
         functionName:updateBGCEmploymentDetails
         inputJSON:
         outputJSON:
         Description: add bgc form
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   21/08/2018

         *******************************************************/


        $scope.addNewEmployment = function(){
            if($scope.bgcEmploymentModel.employmentList.length < 50){
                if($scope.bgcEmploymentModel.isExperienced && !$scope.bgcEmploymentModel.employmentList.length){
                    $scope.bgcEmploymentModel.employmentList.push({
                        'companyName':'',
                        'companyAddressWithPin':'',
                        'remuneration':'',
                        'designation':'',
                        'employeeId':'',
                        'reasonForLeaving':'',
                        'fromDate':'',
                        'toDate':'',
                        'hrName':'',
                        'hrContact':'',
                        'hrEmail':'',
                        'supervisorName':'',
                        'supervisorContact':'',
                        'supervisorEmail':''
                    });
                }
                else
                {
                    if($scope.bgcEmploymentModel.isExperienced && $scope.bgcEmploymentModel.employmentList[$scope.bgcEmploymentModel.employmentList.length - 1].companyName){
                        $scope.bgcEmploymentModel.employmentList.push({
                            'companyName':'',
                            'companyAddressWithPin':'',
                            'remuneration':'',
                            'designation':'',
                            'employeeId':'',
                            'reasonForLeaving':'',
                            'fromDate':'',
                            'toDate':'',
                            'hrName':'',
                            'hrContact':'',
                            'hrEmail':'',
                            'supervisorName':'',
                            'supervisorContact':'',
                            'supervisorEmail':''
                        });
                    }
                    else
                    {
                        if($scope.bgcEmploymentModel.isExperienced){
                            $rootScope.showHideErrorMessage("Please fill blank employment row first then try to add new employment...!!!");
                        }
                        else
                        {
                            $rootScope.showHideErrorMessage("For Freshers employment row is not required.");
                        }

                    }
                }
            }
        };

        $scope.deleteEmploymentRow = function(index){
            if($scope.bgcEmploymentModel.employmentList.length == 1 && $scope.bgcEmploymentModel.isExperienced){
                $rootScope.showHideErrorMessage("All rows are not allowed to delete, If you are fresher then unchecked experienced check box...!!!");
            }
            else
            {
                $scope.bgcEmploymentModel.employmentList.splice(index,  1);
            }

        };

        $scope.checkEmployment = function(value){
            if (!value) {
                if (confirm("Are You Sure, you are fresher because all employment rows will be lost if you have filled.!!!")) {
                    $scope.bgcEmploymentModel.employmentList = [];
                }
                else
                {
                    $scope.bgcEmploymentModel.isExperienced=true;
                }
            }
            else {
                $scope.bgcEmploymentModel.employmentList = [];
                $scope.bgcEmploymentModel.employmentList.push({
                    'companyName': '',
                    'companyAddressWithPin': '',
                    'remuneration': '',
                    'designation': '',
                    'employeeId': '',
                    'reasonForLeaving': '',
                    'fromDate': '',
                    'toDate': '',
                    'hrName': '',
                    'hrContact': '',
                    'hrEmail': '',
                    'supervisorName': '',
                    'supervisorContact': '',
                    'supervisorEmail': ''
                });
            }
        };

        this.updateBGCEmploymentDetails = function(){
            if(LocalStorageService.get('authToken') && LocalStorageService.get('user_bgc_id')){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.bgcId =  LocalStorageService.get('user_bgc_id');
                if($scope.bgcEmploymentModel.employmentList.length){
                    angular.forEach($scope.bgcEmploymentModel.employmentList, function(e, index){
                        e.fromDate = $('#employmentFromDate'+index).val();
                        e.toDate = $('#employmentToDate'+index).val();
                    })
                }
                if($scope.bgcEmploymentModel.canVerifyIn15Days.toLowerCase() == 'no'){
                    $scope.bgcEmploymentModel.dateForVerification = $('#dateForVerification').val();
                }
                else
                {
                    $scope.bgcEmploymentModel.dateForVerification = moment(new Date()).format("DD/MM/YYYY");
                }
                $scope.inputData.employmentList =  [];
                $scope.inputData.employmentList = $scope.bgcEmploymentModel.employmentList;
                $scope.inputData.isExperienced =  $scope.bgcEmploymentModel.isExperienced ? $scope.bgcEmploymentModel.isExperienced : false;
                $scope.inputData.canVerifyIn15Days =  $scope.bgcEmploymentModel.canVerifyIn15Days;
                $scope.inputData.dateForVerification =  $scope.bgcEmploymentModel.dateForVerification;

                //$scope.inputData.employmentList.concat();
                if(($scope.inputData.isExperienced && $scope.inputData.employmentList.length) || !$scope.inputData.isExperienced){
                    $rootScope.loader = true;
                    userDashboardService.updateUserBGCEmploymentDetails($scope.inputData).success(function (result) {
                         //DebugService.logData(result);
                        $rootScope.loader = false;
                        if (result.statusCode == 200) {
                            $rootScope.showHideSuccessMessage(result.statusMessage);
                            self.getEmploymentDetails();
                        } else {
                            $rootScope.showHideErrorMessage(result.statusMessage);
                            //DebugService.logData(result);
                        }
                    })
                }
                else
                {
                    $rootScope.showHideErrorMessage("Please fill all required fields...!!!");
                }
            }
            else
            {
                $location.path('/');
            }

        };


        /***************** *************************************
         functionName:getReferenceDetails
         inputJSON:
         outputJSON:
         Description: add bgc form
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:  06/09/2018

         *******************************************************/
        $scope.bgcReferenceModel = {
            'referenceList': [{
                'name': '',
                'contact': '',
                'email': ''
            },
                {
                    'name': '',
                    'contact': '',
                    'email': ''
                }]
        };

        this.getReferenceDetails = function(){
            if(LocalStorageService.get('authToken') && LocalStorageService.get('user_bgc_id')){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.bgcId =  LocalStorageService.get('user_bgc_id');
                $rootScope.loader = true;
                userDashboardService.getUserReferenceById($scope.inputData).success(function (result) {
                   // DebugService.logData(result);
                    $rootScope.loader = false;
                    if (result.statusCode == 200) {
                        if (result.data) {
                            $scope.bgcReferenceModel.referenceList = result.data;
                        }
                        else
                        {
                            $scope.bgcReferenceModel = {
                                'referenceList': [{
                                    'name': '',
                                    'contact': '',
                                    'email': ''
                                },
                                    {
                                        'name': '',
                                        'contact': '',
                                        'email': ''
                                    }]
                            };
                        }
                        LocalStorageService.set('current_url', $location.path());
                    } else {
                        $rootScope.showHideErrorMessage(result.statusMessage);
                        //DebugService.logData(result);
                    }
                })

            }
            else
            {
                LocalStorageService.clear();
                $location.path('/');
            }

        };

        /***************** *************************************
         functionName:addUpdateReferenceDetails
         inputJSON:
         outputJSON:
         Description: add bgc form
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:  06/09/2018

         *******************************************************/

        this.addUpdateReferenceDetails = function(){
            if(LocalStorageService.get('authToken') && LocalStorageService.get('user_bgc_id')){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.bgcId =  LocalStorageService.get('user_bgc_id');
                $scope.inputData.referenceList =  [];
                $scope.inputData.referenceList = $scope.bgcReferenceModel.referenceList;
                if($scope.inputData.referenceList.length){
                    $rootScope.loader = true;
                    userDashboardService.updateUserBGCReferenceDetails($scope.inputData).success(function (result) {
                        //DebugService.logData(result);
                        $rootScope.loader = false;
                        if (result.statusCode == 200) {
                            $rootScope.showHideSuccessMessage(result.statusMessage);
                            self.getReferenceDetails();
                        } else {
                            $rootScope.showHideErrorMessage(result.statusMessage);
                            //DebugService.logData(result);
                        }
                    })
                }
                else
                {
                    $rootScope.showHideErrorMessage("Please fill all required fields...!!!");
                }
            }
            else
            {
                $location.path('/');
            }

        };

        /***************** *************************************
         functionName:getIdentityDetails
         inputJSON:
         outputJSON:
         Description: add bgc form
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:  06/09/2018

         *******************************************************/
        $scope.bgcIdentityModel = {
            'identityList': [{
                "type":"",
                "number": "",
                "dateOfIssue": "",
                "dateOfExpiry":"",
                "placeOfIssue":""
            }]
        };

        this.getIdentityDetails = function(){
            if(LocalStorageService.get('authToken') && LocalStorageService.get('user_bgc_id')){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.bgcId =  LocalStorageService.get('user_bgc_id');
                $rootScope.loader = true;
                userDashboardService.getUserIdentityById($scope.inputData).success(function (result) {
                    //DebugService.logData(result);
                    $rootScope.loader = false;
                    if (result.statusCode == 200) {
                        if (result.data) {
                            $scope.bgcIdentityModel.identityList = result.data;
                        }
                        else
                        {
                            $scope.bgcIdentityModel = {
                                'identityList': [{
                                    "type":"",
                                    "number": "",
                                    "dateOfIssue": "",
                                    "dateOfExpiry":"",
                                    "placeOfIssue":""
                                }]
                            };
                        }
                        LocalStorageService.set('current_url', $location.path());
                    } else {
                        $rootScope.showHideErrorMessage(result.statusMessage);
                        //DebugService.logData(result);
                    }
                })

            }
            else
            {
                LocalStorageService.clear();
                $location.path('/');
            }

        };


        /***************** *************************************
         functionName:addUpdateReferenceDetails
         inputJSON:
         outputJSON:
         Description: add bgc form
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:  06/09/2018

         *******************************************************/

        this.addUpdateIdentityDetails = function(){
            if(LocalStorageService.get('authToken') && LocalStorageService.get('user_bgc_id')){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.bgcId =  LocalStorageService.get('user_bgc_id');
                if($scope.bgcIdentityModel.identityList.length){
                    angular.forEach($scope.bgcIdentityModel.identityList, function(e, index){
                        e.dateOfIssue = $('#dateOfIssue'+index).val();
                        e.dateOfExpiry = $('#dateOfExpiry'+index).val();
                    })
                }
                $scope.inputData.identityList =  [];
                $scope.inputData.identityList = $scope.bgcIdentityModel.identityList;
                if($scope.inputData.identityList.length){
                    $rootScope.loader = true;
                    userDashboardService.updateUserBGCIdentityDetails($scope.inputData).success(function (result) {
                        //DebugService.logData(result);
                        $rootScope.loader = false;
                        if (result.statusCode == 200) {
                            $rootScope.showHideSuccessMessage(result.statusMessage);
                            self.getIdentityDetails();
                        } else {
                            $rootScope.showHideErrorMessage(result.statusMessage);
                            //DebugService.logData(result);
                        }
                    })
                }
                else
                {
                    $rootScope.showHideErrorMessage("Please fill all required fields...!!!");
                }
            }
            else
            {
                $location.path('/');
            }

        };

        /***************** *************************************
         functionName:getUserBGCEducationalDocumentDetails
         inputJSON:
         outputJSON:
         Description: upload educational documents
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   07/09/2018

         *******************************************************/

        this.getUserBGCEducationalDocumentDetails = function(){
            if(LocalStorageService.get('authToken') && LocalStorageService.get('user_bgc_id')){
                $scope.inputData = {'authToken': LocalStorageService.get('authToken')};
                $scope.inputData.bgcId =  LocalStorageService.get('user_bgc_id');
                $rootScope.loader = true;
                userDashboardService.getUserBGCEducationalDocumentDetails($scope.inputData).success(function (result) {
                   // DebugService.logData(result);
                    $rootScope.loader = false;
                    if (result.statusCode == 200) {
                        $scope.serverBaseURL = result.serverBaseURL;
                        if (result.data) {
                            $scope.educationalDocumentList = result.data;
                        }

                        LocalStorageService.set('current_url', $location.path());
                    } else {
                        $rootScope.showHideErrorMessage(result.statusMessage);
                        //DebugService.logData(result);
                    }
                })

            }
            else
            {
                LocalStorageService.clear();
                $location.path('/');
            }

        };


        /***************** *************************************
         functionName:uploadEducationalDocuments
         inputJSON:
         outputJSON:
         Description: upload educational documents
         UseIn:user-bgc.tpl.html
         OwnerName: Jaydeep Verma
         Date:   07/09/2018

         *******************************************************/

        $scope.educationalDocumentModel = {
            name:''
        };

        this.uploadEducationalDocuments = function () {
            var file = $('#education_file').prop('files');
            var ext = file[0].name.match(/\.(.+)$/)[1];
            if(angular.lowercase(ext) ==='jpg' || angular.lowercase(ext) ==='jpeg' || angular.lowercase(ext) ==='png' || angular.lowercase(ext) ==='pdf'){
                if (file.length < -1) return false;
                $scope.loading = true;
                $scope.educationalDocumentModel.authToken = LocalStorageService.get('authToken');
                $scope.educationalDocumentModel._id = LocalStorageService.get('user_bgc_id');
                //alert(userId);
                var uploadUrl = apiVersion+'user/upload-user-educational-document';
                console.log(uploadUrl);
                userDashboardService.uploadFileWithData(file, $scope.educationalDocumentModel, uploadUrl).success(function (result) {
                    $scope.loading = false;
                   //  DebugService.logData(result);
                    if (result.statusCode == 200) {
                        angular.element("input[type='file']").val(null);
                        $rootScope.showHideSuccessMessage(result.statusMessage);
                        self.getUserBGCEducationalDocumentDetails();
                    }
                    else {
                        $rootScope.showHideSuccessMessage(result.statusMessage);
                        // DebugService.logData(result.statusMessage);
                    }
                });
            }
            else{
                alert("Please select Valid File...!!!");
            }
        };




        $scope.tab_id = $routeParams.tab_id;
        if($scope.tab_id){
            if($scope.tab_id == 1){
                self.getUserProfile();
            }
            else {
                if(LocalStorageService.get('isBGC') == 'true' || LocalStorageService.get('isBGC')){
                    $scope.userProfileModel.isBGC = true;
                }
                else
                {
                    $scope.userProfileModel.isBGC = false;
                }
                if($scope.tab_id == 2){
                    self.getContactDetails();
                }
                else if($scope.tab_id == 3){
                    self.getEducationDetails();
                }
                else if($scope.tab_id == 4){
                    self.getEmploymentDetails();
                }
                else if($scope.tab_id == 5){
                    self.getReferenceDetails();
                }
                else if($scope.tab_id == 6){
                    self.getIdentityDetails();
                }
                else if($scope.tab_id == 7){
                    self.getUserBGCEducationalDocumentDetails();
                }

            }
        }
        else
        {
            $scope.tab_id = 1;
            self.getUserProfile();
        }


    };
    userDashboardController.$inject = injectParams;
    angular.module('rst_app')
        .controller('userDashboardController', userDashboardController)
})();
