/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('myApp.varazstargyak', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/varazstargyak', {
                    templateUrl: 'html/varazstargyak.html',
                    controller: 'vCtrl'
                });
            }])

        .controller('vCtrl', ['$scope', 'myJSONReader', function ($scope, myJSONReader) {
                $scope.nameQuery = "";


                myJSONReader.getOther("varazstargyak").then(function (data) {
                    
                        $scope.spells = data;
                    
                });

                

                function removeAccents(value) {
                    return value
                            .replace(/á/g, 'a')
                            .replace(/é/g, 'e')
                            .replace(/í/g, 'i')
                            .replace(/ó/g, 'o')
                            .replace(/ú/g, 'u');
                }
                $scope.kulcsszoFilter = function (element) {

                    return removeAccents(element.name).match(new RegExp(removeAccents($scope.nameQuery), 'i')) || removeAccents(element.info).match(new RegExp(removeAccents($scope.nameQuery), 'i')) ? true : false;
                };




                $scope.checkMondoka = function (check, spell) {
                    if (check) {

                    } else {

                    }
                }





            }]);
