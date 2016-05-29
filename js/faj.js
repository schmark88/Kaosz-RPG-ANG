/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('myApp.faj', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/faj', {
                    templateUrl: 'html/faj.html',
                    controller: 'FajCtrl'
                });
            }])

        .controller('FajCtrl', ['$scope', 'CharService', 'myJSONReader', function ($scope, CharService, myJSONReader ) {
                $scope.char = CharService.data;
                $scope.metod = CharService;
                $scope.Math = Math;

                $scope.loadRace = function (race) {
                    //f=foertek.get({raceId:race});
                    //f=foertek.query();
                    myJSONReader.getRace(race).then(function (data) {
                        
                        CharService.setRace(data);
                    });


                };
                
                $scope.dummy = function(nev){
                    console.log("nev")
                    CharService.data.name = nev;

                }

                   $scope.$watch(function () {
                    return $scope.nev;
                }
                , function (newVal, oldVal) {
//                     if (isEmpty(newVal)) {
                       CharService.data.name = $scope.nev;
//                   }
                    
                });
                
//                myJSONReader.getJart('tudomany').then(function (data) {
//                    $scope.csop = angular.fromJson(data);
//
//
//                    angular.forEach($scope.csop, function (value, key) {
//                        if(!angular.equals(value.id,key)){
//                            console.log(key);
//                        }
//                        if(!(angular.equals(value.reqFoertekId,"tudat") 
//                                || angular.equals(value.reqFoertekId,"intelligencia")
//                                || angular.equals(value.reqFoertekId,"lelkiero")
//                                || angular.equals(value.reqFoertekId,"ratermettseg")
//                                || angular.equals(value.reqFoertekId,"ugyesseg")
//                                || angular.equals(value.reqFoertekId,"reflex")
//                                || angular.equals(value.reqFoertekId,"fizikum")
//                                || angular.equals(value.reqFoertekId,"ero")
//                                || angular.equals(value.reqFoertekId,"szivossag")
//                                || angular.equals(value.reqFoertekId,"esszencia")
//                                || angular.equals(value.reqFoertekId,"varazsero")
//                                || angular.equals(value.reqFoertekId,"esszenciapjazs") 
//                                
//                                ) ){
//                            console.log(value.reqFoertekId);
//                        }
//                    });
//                });
               

            }]);
