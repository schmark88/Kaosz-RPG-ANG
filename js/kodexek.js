/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('myApp.kodexek', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/kodexek', {
                    templateUrl: 'html/kodexek.html',
                    controller: 'KodexekCtrl'
                });
            }])

        .controller('KodexekCtrl', ['$scope', 'myJSONReader', function ($scope, myJSONReader) {
                $scope.spells = [];
                $scope.nameQuery = "";
                $scope.nehezsegQuery = 10;
                $scope.kodexFuggetlen = false;
                $scope.kodexSkarlat = false;
                $scope.kodexAzur = false;
                $scope.kodexGranit = false;
                $scope.kodexAlabastrom = false;
                $scope.kodexSmaragd = false;
                $scope.kodexFekete = false;
                $scope.kodexEzust = false;
                $scope.kodexKigyoko = false;
                $scope.kodexArany = false;
                $scope.kodexPraktikus = false;

                $scope.infoFuggetlen = "Álalános celú varázslatok";
                $scope.infoSkarlat = "Tűzvarázslatok használatukhoz nyílt láng szükséges";
                $scope.infoAzur = "Víz elemű varázslatok";
                $scope.infoGranit = "Föld elemű varázslatok";
                $scope.infoAlabastrom = "Levegő elemű varázslatok";
                $scope.infoSmaragd = "Druida kódex, ami természet varázslatokat tartalmaz, egyes varázslatokat csak druidák használhatnak";
                $scope.infoFekete = "Sötét varázslatok, (demonidézés,rontások,átkok..) használatukhoz életerőt is kell áldozni (nemfeltétlen a használóét)";
                $scope.infoEzust = "Idő és térmágia kódexe (kicsinyítés, teleportáció...)";
                $scope.infoKigyoko =  "Közvetlenül a tudatra és az érzelmekre és az érzékszervekre ható va-\nrázslatok gyujteménye. Mivel a hatás mágikus, ezért teljesen függet-\nlen a varázshasználó személyétol, karizmatikus, vagy éppen erotikus\nmegjelenésétol \u0096 éppúgy a célszemély lelki stabilitásától, intelligenci-\nájától is. Egyetlen dolog befolyásolja a hatás sikerét: a célszemély má-\ngikus ellenállásának sikere.\n";   
                $scope.infoArany = "Az  illúziómágia  kódexe,  megfeleloen  az  illúziók  kétféle  természeté-\nnek, kétféle varázslattípust tartalmaz. Az egyik, amelyik a valóság ér-\nzékelheto  látszatát  hozza  létre,  a  másik,  amelyik  a  valóságot  nem\nbolygatva, az érzékszerveket nem igénybe véve, közvetlenül a célsze-\nmély elméjét befolyásolja. Ez nem csupán elvi különbség, mivel a va-\nrázslat hatása, illetve a hatás ellen kifejteto mágikus \u0096 és szellemi \u0096 el-\nlenállás lényegesen más a két illúziótípusnál.\n";
    
                var kodexArray = [];

                //f=foertek.get({raceId:race});
                //f=foertek.query();
                myJSONReader.getOther("kodexek/praktikus").then(function (data) {
                    angular.forEach(data, function (value, key) {
                        $scope.spells.push(value);

                    });
                });
                myJSONReader.getOther("kodexek/fuggetlen").then(function (data) {
                    angular.forEach(data, function (value, key) {
                        $scope.spells.push(value);
                    });
                });
                myJSONReader.getOther("kodexek/skarlat").then(function (data) {
                    angular.forEach(data, function (value, key) {
                        $scope.spells.push(value);
                    });
                });
                myJSONReader.getOther("kodexek/azur").then(function (data) {
                    angular.forEach(data, function (value, key) {
                        $scope.spells.push(value);
                    });
                });
                myJSONReader.getOther("kodexek/granit").then(function (data) {
                    angular.forEach(data, function (value, key) {
                        $scope.spells.push(value);
                    });
                });
                myJSONReader.getOther("kodexek/alabastrom").then(function (data) {
                    angular.forEach(data, function (value, key) {
                        $scope.spells.push(value);
                    });
                });
                myJSONReader.getOther("kodexek/smaragd").then(function (data) {
                    angular.forEach(data, function (value, key) {
                        $scope.spells.push(value);
                    });
                });
                myJSONReader.getOther("kodexek/fekete").then(function (data) {
                    angular.forEach(data, function (value, key) {
                        $scope.spells.push(value);
                    });
                });
                myJSONReader.getOther("kodexek/ezust").then(function (data) {
                    angular.forEach(data, function (value, key) {
                        $scope.spells.push(value);
                    });
                });
                myJSONReader.getOther("kodexek/kigyoko").then(function (data) {
                    angular.forEach(data, function (value, key) {
                        $scope.spells.push(value);
                    });
                });
                myJSONReader.getOther("kodexek/arany").then(function (data) {
                    angular.forEach(data, function (value, key) {
                        $scope.spells.push(value);
                    });
                });

                $scope.checkKodex = function () {
                    kodexArray = [];
                    if ($scope.kodexFuggetlen) {
                        kodexArray.push("Független");

                    }
                    if ($scope.kodexPraktikus) {
                        kodexArray.push("Praktikus");
                    }
                    if ($scope.kodexSkarlat) {
                        kodexArray.push("Skarlát");
                    }
                    if ($scope.kodexAzur) {
                        kodexArray.push("Azúr");
                    }
                    if ($scope.kodexGranit) {
                        kodexArray.push("Gránit");

                    }
                    if ($scope.kodexAlabastrom) {
                        kodexArray.push("Alabástrom");
                    }
                    if ($scope.kodexSmaragd) {
                        kodexArray.push("Smaragd");
                    }
                    if ($scope.kodexFekete) {
                        kodexArray.push("Fekete");
                    }
                    if ($scope.kodexEzust) {
                        kodexArray.push("Ezüst");
                    }
                    if ($scope.kodexKigyoko) {
                        kodexArray.push("Kígyókő");
                    }
                    if ($scope.kodexArany) {
                        kodexArray.push("Arany");
                    }

                }

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
                $scope.nehezsegFilter = function (element) {
                    return  element.nehezseg <= $scope.nehezsegQuery ? true : false;
                };
                $scope.kodexFilter = function (element) {
                    var ret = false;
                    angular.forEach(kodexArray, function (value, key) {
                       // console.log(value + " " + element.kodex);
                        if (angular.equals(value, element.kodex)) {
                            ret = true;
                        }
                    });
                    return ret;
                };






            }]);
