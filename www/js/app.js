// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

(function () {

    'use strict';
    
    var ionicPlatform = function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            // bacground foreground event           
            //document.addEventListener("resume", yourCallbackFunction, false);
        });
    }

    var appStates = function ($httpProvider, $stateProvider, $urlRouterProvider) {



        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];

        $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'appCtrl'
        })

        // .state('app.beacon', {
        //     url: '/beacon',
        //     views: {
        //         'menuContent': {
        //             templateUrl: 'templates/subwayTime.html',
        //             controller: 'beaconCtrl'
        //         }
        //     }
        // })
        .state('app.advisory', {
            url: '/advisories/:lineId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/advisories.html',
                    controller: 'advisoryCtrl'
                }
            }
        })
        .state('app.updates', {
            url: '/updates',
            views: {
                'menuContent': {
                    templateUrl: 'templates/updates.html',
                    controller: 'updatesCtrl'
                }
            }
        })
         .state('app.legend', {
            url: '/legend/:l',
            views: {
                'menuContent': {
                    templateUrl: 'templates/legend.html',
                    controller: 'legendCtrl'
                }
            }
        })


        .state('pagelinks', {
          url: '/pagelinks/?:pageurl',
          templateUrl: 'templates/pagelinks.html',
         controller: function($scope, $stateParams) {
            $scope.pageurl = $stateParams.pageurl;

           // $scope.myurl = "http://tripplanner.mta.info/mobileApps/serviceStatus/index.html?myvar=" + (new Date()).getTime();
            

          }
        }) 

        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'homeCtrl'
                }
            }
        })
        .state('app.lines', {
          url: '/lines',
          views: {
              'menuContent': {
                  templateUrl: 'templates/lines.html',
                  controller: 'linesListCtrl'
              }
            }
        })
        .state('app.subwayTime', {
            url: '/subwaytime/:lineId/:stationId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/subwayTime.html',
                    controller: 'subwayTimeCtrl'
                }
            }
        })
        .state('app.stations', {
            url: '/stations/:lineId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/stations.html',
                    controller: 'stationsListCtrl'
                }
            }
        })
        .state('app.favorites', {
            url: '/favorites',
            views: {
                'menuContent': {
                    templateUrl: 'templates/favorites.html',
                    controller: 'favoritesCtrl'
                }
            }
        }) 
        .state('app.browse', {
            url: '/browse',
            views: {
                'menuContent': {
                    templateUrl: 'templates/browse.html',
                    controller: 'mapCtrl'
                }
            }
        });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');

    }

    var dataFactory = function ($http) {

        var urlBase = 'http://52.90.254.173/';
        // var urlBase = 'http://localhost:3000/';
        var imgPath = urlBase + 'images/';
        var callback = '?callback=JSON_CALLBACK'
        var dataFactory = {};

        dataFactory.getSubwaylines = function () {
            return $http.jsonp(urlBase + 'getSubwaylines' + callback);
        };

        dataFactory.getStationsByLine = function (params) {
            // Get line status
            // var advisory_status = $http.jsonp(urlBase + 'getAdvisoryStatus' + params + callback);

            // var lineStations = $http.jsonp(urlBase + 'getStationsByLine' + params + callback);

            // var totalData = {};
            // totalData.advisory_status;
            // totalData.lineStations;

            // lineStations.advisory_status = advisory_status;

            // console.log(advisory_status);
            // console.log(JSON.stringify(totalData));

            // return lineStations;

            // return JSON.stringify(totalData);

            return $http.jsonp(urlBase + 'getStationsByLine' + params + callback);
        };

        dataFactory.getTime = function (params) {
            return $http.jsonp(urlBase + 'getTime' + params + callback);
        };

        dataFactory.getAdvisoryStatus = function (params) {
            return $http.jsonp(urlBase + 'getAdvisoryStatus' + params + callback);
        };

        dataFactory.getAdvisoryDetail = function (params) {
            return $http.jsonp(urlBase + 'getAdvisoryDetail' + params + callback);
        };

        dataFactory.getFavoriteList = function () {
            var favList = [
                 { lineImage: imgPath + '1_sm.png', lineID: '1', color: '#E31D00', station: "Rector Street", stationId: '139', type: '0' },
                 { lineImage: imgPath + '4_sm.png', lineID: '4', color: '#00933C', station: "Bowling Green", stationId: '420', type: '0' },
                 { lineImage: imgPath + '5_sm.png', lineID: '5', color: '#00933C', station: "Bowling Green", stationId: '420', type: '0' },
                 { lineImage: imgPath + 'b_sm.png', lineID: 'B', color: '#F7931E', station: "Atlantic Av - Barclays Ctr", stationId: 'D24', type: '1' },
                 { lineImage: imgPath + 'd_sm.png', lineID: 'D', color: '#F7931E', station: "Atlantic Av - Barclays Ctr", stationId: 'R31', type: '0' }
            ];

            return favList;            
        };

        dataFactory.getTempList = function () {
            var tempList = [
                  { lineImage: imgPath + '1_sm.png', lineID: '1', color: '#E31D00', station: "Rector Street", stationId: '139', type: '0' },
                  { lineImage: imgPath + '2_sm.png', lineID: '2', color: '#E31D00', station: "Wall St", stationId: '230', type: '0' },
                  { lineImage: imgPath + '3_sm.png', lineID: '3', color: '#E31D00', station: "Wall St", stationId: '230', type: '0' },
                  { lineImage: imgPath + '4_sm.png', lineID: '4', color: '#00933C', station: "Bowling Green", stationId: '420', type: '0' },
                  { lineImage: imgPath + '5_sm.png', lineID: '5', color: '#00933C', station: "Bowling Green", stationId: '420', type: '0' },
                  { lineImage: imgPath + '4_sm.png', lineID: '4', color: '#00933C', station: "Wall St", stationId: '419', type: '0' },
                  { lineImage: imgPath + '5_sm.png', lineID: '5', color: '#00933C', station: "Wall St", stationId: '419', type: '0' }
                    ];

            return tempList;
        }

        dataFactory.getClosestStationsList = function (params) {
            // return $http.jsonp(urlBase + 'getClosestStations' + '/40.0583238/-74.4056612' + callback);
            return $http.jsonp(urlBase + 'getClosestStations' + params + callback);
        }
         
        return dataFactory;
    }

    var debugInfo = function ($compileProvider, $ionicConfigProvider)
    {
        $compileProvider.debugInfoEnabled(false); 
        $ionicConfigProvider.views.swipeBackEnabled(false);
    }

    var applyAsync = function ($httpProvider) {
        $httpProvider.useApplyAsync(true);
    }

    var socket = function() {
        // return io.connect('http://localhost:3000');
        return io.connect('http://52.90.254.173/');
    }



     
    angular.module('subwayTime', ['ionic', 'ngCordova', 'btford.socket-io', 'ngSanitize'])
    .config(appStates)
    .config(debugInfo)
    .config(applyAsync)
    .run( ionicPlatform)
    .factory('dataFactory', dataFactory)
    .factory('socket', socket)




    
}());
 