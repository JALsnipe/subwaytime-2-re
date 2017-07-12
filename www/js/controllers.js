(function () {
    'use strict';

    angular
        .module('subwayTime')
        .controller('appCtrl', appCtrl)
        .controller('linesListCtrl', linesListCtrl)
        .controller('subwayTimeCtrl', subwayTimeCtrl)
        .controller('stationsListCtrl', stationsListCtrl)
        .controller('favoritesCtrl', favoritesCtrl)
        .controller('browseCtrl', browseCtrl)
        .controller('homeCtrl', homeCtrl)
        .controller('advisoryCtrl', advisoryCtrl)
        .controller('updatesCtrl', updatesCtrl)
        .controller('legendCtrl', legendCtrl)

        // .controller('mapCtrl', mapCtrl)
        // .controller('beaconCtrl', beaconCtrl)


      appCtrl.$inject = ['$scope', '$ionicModal','$state', '$rootScope', '$ionicPlatform','$cordovaNetwork'];
    function appCtrl($scope, $ionicModal, $state, $rootScope, $ionicPlatform, $cordovaNetwork) {


            $scope.isOffline = false;
              document.addEventListener("deviceready", function () {
                    
                   setTimeout(function() {
                        $scope.network = $cordovaNetwork.getNetwork();
                        $scope.isOnline = $cordovaNetwork.isOnline();
                        $scope.isOffline = $cordovaNetwork.isOffline();
                        $scope.$apply();
                        
                        // listen for Online event
                        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
                            $scope.isOnline = true;
                            $scope.isOffline = false;
                            $scope.network = $cordovaNetwork.getNetwork();
                            
                            $scope.$apply();
                        })

                        // listen for Offline event
                        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
                            console.log("got offline");
                            $scope.isOnline = false;
                            $scope.isOffline = true;
                            $scope.network = $cordovaNetwork.getNetwork();
                            
                            $scope.$apply();
                        })
                    },0);

                }, false);




        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};
   
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };

    }

    linesListCtrl.$inject = ['$scope', 'dataFactory','socket'];
    function linesListCtrl($scope, dataFactory, socket) {
        // Keep the following line of code; using own Service to fetch line list
        // $scope.lineList = getSubwayLines.subwayLinesList();
        // $http.get('http://localhost:3000/getSubwaylines').then(function(resp){

        $scope.lineList  =[];
        
        // socket.on('subwayLines', function (data) {
        //     console.log("got socket data");
        //     $scope.lineList = data;
        //     // socket.emit('my other event', { my: 'data' });
        // });

        // socket.emit("getlines", "this request is from client");
        // setTimeout(function() {
        //             if(done == 1){ $scope.downloading = true; }               
        //         }, 400); 
        $scope.serverError = false;
        $scope.downloading = true;

        
        if ($scope.lineList.length == 0) { 
                      
            dataFactory.getSubwaylines()
            .success(function (data) {

                $scope.lineList = data;
            })
            .error(function (error) {
                //console.log(data);
                
                $scope.serverError = true;
                $scope.data = "Request failed";
            }).finally(function () {
              // Hide loading spinner whether our call succeeded or failed.
                $scope.downloading = false;
            });
        }
        else
        {
            $scope.downloading = false;
        }
    }

    homeCtrl.$inject = ['$scope', '$state', '$rootScope', '$ionicPlatform', 'socket'];
    function homeCtrl($scope, $state, $rootScope, $ionicPlatform, socket) {

    }

    

    advisoryCtrl.$inject = ['$scope', '$stateParams', 'dataFactory'];
    function advisoryCtrl($scope, $stateParams, dataFactory){
        var params ='/' +  $stateParams.lineId;
        //startLoadingData();
        $scope.serverError = false;
        $scope.downloading = true;

        

        dataFactory.getAdvisoryDetail(params)
        .success(function (data) {
            
            $scope.l = $stateParams.lineId;
            $scope.advisories = data; 

        })
        .error(function (error) {
            //console.log(data);
            $scope.serverError = true;
            $scope.data = "Request failed";
            
        }).finally(function () {
          // Hide loading spinner whether our call succeeded or failed.
          $scope.downloading = false;
        });
    }

    updatesCtrl.$inject = ['$scope', '$stateParams', 'dataFactory'];
    function updatesCtrl($scope, $stateParams, dataFactory){
    }


    legendCtrl.$inject = ['$scope', '$stateParams', 'dataFactory'];
    function legendCtrl($scope, $stateParams, dataFactory){
       $scope.l = $stateParams.l; 
    }

    
    subwayTimeCtrl.$inject = ['$scope', '$stateParams','dataFactory', '$timeout','socket'];
    function subwayTimeCtrl($scope, $stateParams, dataFactory, $timeout, socket){

        // $scope.support = false;
        // if(window.speechSynthesis) {
        //     $scope.support = true;                                    

        //     $timeout(function () {
        //       $scope.voices = speech.getVoices();          
        //     }, 500);  
        // }

        // $scope.pitch = 1;
        // $scope.rate = 1;
        // $scope.volume = 1;
        $scope.serverError = false;
        $scope.downloading = true;
        
       
        // Fetch the latest train time data from the server
        var params ='/' +  $stateParams.lineId + '/' + $stateParams.stationId  
        dataFactory.getTime(params)
        .success(function (data) {
            $scope.subwayTime = data;

            // Say the train arrival times
            //_speak (data);
            // Now listen for train updates
            document.addEventListener("pause", onPause, false);
            document.addEventListener("resume", onResume, false);
            _listen_for_updates($scope, $stateParams, socket);
            
        })
        .error(function (error) {
            //console.log(data);
            $scope.serverError = true;
            $scope.data = "Request failed";
            
        }).finally(function () {
          // Hide loading spinner whether our call succeeded or failed.
          $scope.downloading =  false;
        });
    }
    // check backround status
    var isBackground=false;

    function onPause() 
    {
        // Handle the resume event
        isBackground=true;
    }

    function onResume() 
    {

        setTimeout(function() {
          // TODO: do your thing!
        isBackground=false;

        }, 0);
        // Handle the resume event
         
    }



    // This fuction uses socket.io to listen for train time updates
    function _listen_for_updates ($scope, $stateParams, socket) {
        var stn = {"lineId": ($stateParams.lineId).toUpperCase(), "stationId" : ($stateParams.stationId).toUpperCase() };
        // var tu = "train-updates-" + stn.lineId + "-" + stn.stationId;
        var tu = "train-updates-" + stn.stationId;
      
        // -- To DO --
        // Check for a good socket connection with the server and if it is good, only then wait for updates.
        socket.emit("train-updates", stn);
        // socket.emit(tu, stn);

        // Listen for Subway Time updates for this station
        // socket.on("train-updates", function (data) {
        if(isBackground == false)
        {    
            socket.on(tu, function (data) {
                $scope.$apply(function() {
                    
                        $scope.subwayTime = data;

                    // Say the train arrival times
                       //_speak(data);
                    
                });
            });
        }
       

    }


    stationsListCtrl.$inject = ['$scope', '$stateParams', 'dataFactory'];
    function stationsListCtrl($scope, $stateParams,dataFactory){
        var params ='/' +  $stateParams.lineId;
        $scope.serverError = false;
        $scope.downloading = true;
       
        

        dataFactory.getStationsByLine(params)
        .success(function (data) {
            $scope.l = $stateParams.lineId;
            $scope.stationList = data;

              dataFactory.getAdvisoryStatus(params)
                .success(function (data) {
                    $scope.advisory_status = data;
                })
                .error(function (error) {
                   // console.log(error);
                });
        })
        .error(function (error) {
            
            $scope.serverError = true;
            //console.log(error);
        }).finally(function () {
          // Hide loading spinner whether our call succeeded or failed.
          $scope.downloading =  false;
        });

      
    }

    favoritesCtrl.$inject = ['$scope', 'dataFactory'];
    function favoritesCtrl($scope,dataFactory){

        var favList = dataFactory.getFavoriteList();
        $scope.favList = favList;
        $scope.listCanSwipe = true;

        $scope.delete = function(stationId) {
            favList.forEach( function(item) {
                if (item.stationId == stationId)
                    favList.splice(favList.indexOf(item), 1);
            });
        }
    }

    browseCtrl.$inject = ['$scope', 'dataFactory'];
    function browseCtrl($scope,dataFactory){
        $scope.favList = dataFactory.getTempList();
        $scope.listCanSwipe = true;

        $scope.addFavorite = function(lineID, stationId) {
        }
    }

    
   
    
}());