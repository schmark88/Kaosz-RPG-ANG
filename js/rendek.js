/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('myApp.rendek', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/rendek', {
                    templateUrl: 'html/rendek.html',
                    controller: 'RendekCtrl'
                });
            }])

        .controller('RendekCtrl', ['$scope', 'CharService', 'myJSONReader', function ($scope, CharService, myJSONReader) {
                $scope.char = CharService.data;
                $scope.metod = CharService;
                $scope.hasRend = function (rend) {
                    if (!angular.equals({}, $scope.char.rend)) {

                        if (angular.equals($scope.char.rend.id, rend.id)) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    return true;
                };
                $scope.checkRend = function (checked, rend) {
                    if (checked) {
                        $scope.char.rend = rend;
                        angular.forEach(rend.bonusJart, function (value, key) {

                            CharService.addBonusJart(key, value);
                        });


                    } else {
                        angular.forEach(rend.bonusJart, function (value, key) {
                            CharService.removeBonusJart(key);
                        });
                        $scope.char.rend = {};
                    }
                };

                $scope.changeV = function (newV, oldV, jart, szint) {
                    console.log("old " + oldV);
                    console.log("new " + newV);

                    if (jart.hasOwnProperty('fegyvercsop')) {
                        jart.fegyvercsop[newV] = {};
                        jart.fegyvercsop[newV].have = true;
                        jart.fegyvercsop[newV].atk = szint;
                        jart.fegyvercsop[newV].def = szint;
                        if (oldV) {
                            jart.fegyvercsop[oldV].have = false;
                            jart.fegyvercsop[oldV].atk = 0;
                            jart.fegyvercsop[oldV].def = 0;
                        }
                    }
                    if (jart.hasOwnProperty('csoportok')) {
                        jart.csoportok[newV] = {};
                        jart.csoportok[newV].have = true;
                        jart.csoportok[newV].level = szint;
                        if (oldV) {
                            jart.csoportok[oldV].have = false;
                            jart.csoportok[oldV].level = 0;
                        }

                    }
                    angular.forEach(rend.bonusJart, function (value, key) {
                        console.log("add");
                            CharService.addBonusJart(key, value);
                        });



                };


                myJSONReader.getOther('rendek').then(function (data) {

                    $scope.rendek = data
                });




            }]);
