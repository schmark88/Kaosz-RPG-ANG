/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('myApp.tablak', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/tablak', {
                    templateUrl: 'html/tablak.html',
                    controller: 'tablakCtrl'
                });
            }])

        .controller('tablakCtrl', ['$scope', 'GMService', 'myJSONReader', function ($scope, GMService, myJSONReader) {
                $scope.gm = GMService;


                $scope.loadRace = function (race) {
                    //f=foertek.get({raceId:race});
                    //f=foertek.query();
                    myJSONReader.getRace(race).then(function (data) {

                        CharService.setRace(data);
                    });


                };

                $scope.file_changed = function (element) {
                    var dataFile = element.files[0];
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $scope.$apply(function () {
                            var jatekos = JSON.parse(reader.result);
                            GMService.data.jatekosok[jatekos.name] = jatekos;

                        });
                    };
                    reader.readAsText(dataFile);
                };

                $scope.removeJatekos = function (jatekos) {
                    delete GMService.data.jatekosok[jatekos.name];
                }
                $scope.removeNPC = function (jatekos) {
                    delete GMService.data.npck[jatekos.name];
                }

                $scope.harcba = function (jatekos, kezdem, fegyver) {
                    jatekos.szegmensNov = jatekos.speed.current + fegyver;
                    jatekos.szegmens = jatekos.szegmensNov + kezdem;
                    GMService.data.harcban[jatekos.name] = jatekos;
                }
                $scope.kuzd = function (jatekos) {
                    jatekos.szegmens = jatekos.szegmens + jatekos.szegmensNov;
                }

                $scope.jszint = 0;
                $scope.nehezseg = 0;
                $scope.$watch(function () {
                    return [$scope.jszint, $scope.nehezseg];
                }
                , function (newVal, oldVal) {
//                     if (isEmpty(newVal)) {

                    $scope.eredmenyz = GMService.getZafirTable($scope.jszint, $scope.nehezseg);
                }, true);

                $scope.jszint1 = 0;
                $scope.nehezseg1 = 0;
                $scope.$watch(function () {
                    return [$scope.jszint1, $scope.nehezseg1];
                }
                , function (newVal, oldVal) {
//                     if (isEmpty(newVal)) {

                    $scope.eredmenyr = GMService.getRubinTable($scope.jszint1, $scope.nehezseg1);
                }, true);

                $scope.jszint2 = 0;
                $scope.nehezseg2 = 0;
                $scope.$watch(function () {
                    return [$scope.jszint2, $scope.nehezseg2];
                }
                , function (newVal, oldVal) {
//                     if (isEmpty(newVal)) {

                    $scope.eredmenys = GMService.getSmaragdTable($scope.jszint2, $scope.nehezseg2);
                }, true);

                $scope.$watch(function () {
                    return [$scope.scelszam, $scope.sdobas, $scope.sszorzo];
                }, function (newVal, oldVal) {
//                     if (isEmpty(newVal)) {

                    $scope.sebzes = Math.round(($scope.scelszam-$scope.sdobas)/10)*$scope.sszorzo;
                }, true);


                $scope.$watch(function () {
                    return [GMService];
                }
                , function (newVal, oldVal) {
//                     if (isEmpty(newVal)) {

                    GMService.saveData();
                }, true);


            }]);


