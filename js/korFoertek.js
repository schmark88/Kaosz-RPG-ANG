/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('myApp.korFoertek', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/korFoertek', {
                    templateUrl: 'html/korFoertek.html',
                    controller: 'KorFoertekCtrl'
                });
            }])

        .controller('KorFoertekCtrl', ['$scope', 'CharService', 'myJSONReader', function ($scope, CharService, myJSONReader) {
                $scope.char = CharService.data;
                $scope.metod = CharService;
                myJSONReader.getRace(CharService.data.faj).then(function (data) {
                    faj = angular.fromJson(data);
                });

                myJSONReader.getOther('infoFoertek').then(function (data) {
                    $scope.foertekText = data;
                });
                myJSONReader.getOther('infoKor').then(function (data) {
                    $scope.korText = data;
                });

                $scope.setAge = function () {
                    CharService.setAge(faj, $scope.age);
                };




            }]);
