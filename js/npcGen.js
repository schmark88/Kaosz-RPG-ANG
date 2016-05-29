/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('myApp.npcGen', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/npcGen', {
                    templateUrl: 'html/npcGen.html',
                    controller: 'npcGenCtrl'
                });
            }])

        .controller('npcGenCtrl', ['$scope', 'GMService', 'myJSONReader', function ($scope, GMService, myJSONReader) {
                $scope.gm = GMService;
                $scope.npc = {};
                $scope.npc.speed={};
                $scope.npc.fizikum = 0;
                $scope.npc.ratermettseg = 0;
                $scope.npc.esszencia = 0;
                $scope.npc.tudat = 0;
                $scope.npc.speed.current = 0;
                $scope.npc.tamadosz = 0;
                $scope.npc.sebzesszorzo = 1;
                $scope.npc.vedosz = 0;
                $scope.npc.eszcpajzssz = 0;
                $scope.sema = {};
                $scope.loadRace = function (race) {
                    //f=foertek.get({raceId:race});
                    //f=foertek.query();
                    myJSONReader.getRace(race).then(function (data) {
                        $scope.sema =data;
                        $scope.npc.speed.current = data.speed.base;
                    });


                };

                $scope.file_changed = function (element) {
                    var dataFile = element.files[0];
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $scope.$apply(function () {
                            var jatekos = JSON.parse(reader.result);
                            GMService.data.jatekosok[jatekos.faj] = jatekos;

                        });
                    };
                    reader.readAsText(dataFile);
                };

                $scope.removeJatekos = function (jatekos) {
                    delete GMService.data.jatekosok[jatekos.faj];
                }
                
                $scope.harcba= function (jatekos,kezdem,fegyver){
                    jatekos.szegmensNov = jatekos.speed.current + fegyver;
                    jatekos.szegmens = jatekos.szegmensNov + kezdem;
                    GMService.data.harcban[jatekos.faj] = jatekos;
                }
                $scope.kuzd = function (jatekos){
                    jatekos.szegmens= jatekos.szegmens + jatekos.szegmensNov;
                }

                
                
                $scope.$watch(function () {
                    return [GMService];
                }
                , function (newVal, oldVal) {
//                     if (isEmpty(newVal)) {

                    GMService.saveData();
                }, true);
                $scope.addNPC = function (){
                    console.log("called");
                    $scope.npc.maxHP = $scope.npc.fizikum;
                    $scope.npc.maxEP = Math.round($scope.npc.esszencia *0.2 + (0.1*$scope.npc.eszcpajzssz ));
                  $scope.gm.data.npck[$scope.npc.name]=$scope.npc;  
                };
            }]);


