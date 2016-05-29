/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('myApp.praktikus', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/praktikus', {
                    templateUrl: 'html/praktikus.html',
                    controller: 'PraktikusCtrl'
                });
            }])

        .controller('PraktikusCtrl', ['$scope', 'CharService', 'myJSONReader', function ($scope, CharService, myJSONReader) {
                $scope.char = CharService.data;
                $scope.metod = CharService;


                //f=foertek.get({raceId:race});
                //f=foertek.query();
                myJSONReader.getOther("kodexek/praktikus").then(function (data) {

                    $scope.praktikus = data;
                });
                $scope.hasPraktikusM = function (spell) {
                    return CharService.data.praktikus.hasOwnProperty(spell.id) ;
                }

                $scope.checkMondoka= function (check,spell) {
                    if(check){
                    CharService.data.praktikus[spell.id] = spell;
                }else{
                    delete CharService.data.praktikus[spell.id];
                }
                }
                
                $scope.$watch(function () {
                    return CharService.data.praktikus;
                }
                , function (newVal, oldVal) {
//                     if (isEmpty(newVal)) {

                    CharService.saveData();
                }, true);




            }]);
