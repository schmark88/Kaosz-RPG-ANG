

angular.module('myApp.jartassagok', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/jartassagok', {
                    templateUrl: 'html/jartassagok.html',
                    controller: 'View1Ctrl'
                });
            }])

        .controller('View1Ctrl', ['$scope', 'myJSONReader', 'CharService', function ($scope, myJSONReader, CharService) {
                myJSONReader.getJart('gyogyitas').then(function (data) {
                    $scope.gyogyitas = angular.fromJson(data);
                    angular.forEach($scope.gyogyitas, function (value, key) {
                        $scope.gyogyitas[key].reqCleared = isReqCleared(value);
                        $scope.gyogyitas[key].maxLevel = setMaxLevel(value);
                    });
                    angular.forEach(CharService.data.jartassagok, function (value, key) {
                        if ($scope.gyogyitas.hasOwnProperty(key)) {
                            $scope.gyogyitas[key] = value;
//                            $scope.gyogyitas[key].maxLevel = $scope.gyogyitas[key].minLevel < $scope.gyogyitas[key].maxLevel ? scope.gyogyitas[key].maxLevel : $scope.tudomany[key].minLevel;
                        }
                    });
                });

                myJSONReader.getJart('ver').then(function (data) {
                    $scope.ver = angular.fromJson(data);
                    angular.forEach(CharService.data.jartassagok, function (value, key) {
                        if ($scope.ver.hasOwnProperty(key)) {
                            $scope.ver[key] = value;
                        }
                    });
                    angular.forEach($scope.ver, function (value, key) {
                        $scope.ver[key].reqCleared = isReqCleared(value);
                        $scope.ver[key].maxLevel = setMaxLevel(value);
                    });
                });

                myJSONReader.getJart('tudomany').then(function (data) {
                    $scope.tudomany = angular.fromJson(data);
                    angular.forEach(CharService.data.jartassagok, function (value, key) {
                        if ($scope.tudomany.hasOwnProperty(key)) {
                            $scope.tudomany[key] = value;
                        }
                    });
                    angular.forEach($scope.tudomany, function (value, key) {
                        $scope.tudomany[key].reqCleared = isReqCleared(value);
                        $scope.tudomany[key].maxLevel = setMaxLevel(value);
//                        $scope.tudomany[key].maxLevel = $scope.tudomany[key].minLevel < $scope.tudomany[key].maxLevel ? $scope.tudomany[key].maxLevel : $scope.tudomany[key].minLevel;

                    });
                });

                myJSONReader.getJart('ejszaka').then(function (data) {
                    $scope.ejszaka = angular.fromJson(data);
                    angular.forEach(CharService.data.jartassagok, function (value, key) {
                        if ($scope.ejszaka.hasOwnProperty(key)) {
                            $scope.ejszaka[key] = value;
                        }
                    });
                    angular.forEach($scope.ejszaka, function (value, key) {
                        $scope.ejszaka[key].reqCleared = isReqCleared(value);
                        $scope.ejszaka[key].maxLevel = setMaxLevel(value);
                        
//                        $scope.tudomany[key].maxLevel = $scope.tudomany[key].minLevel < $scope.tudomany[key].maxLevel ? $scope.tudomany[key].maxLevel : $scope.tudomany[key].minLevel;

                    });

                });
                myJSONReader.getJart('hetkoznapok').then(function (data) {
                    $scope.hetkoznapok = angular.fromJson(data);
                    angular.forEach(CharService.data.jartassagok, function (value, key) {
                        if ($scope.hetkoznapok.hasOwnProperty(key)) {
                            $scope.hetkoznapok[key] = value;
                        }
                    });
                    angular.forEach($scope.hetkoznapok, function (value, key) {
                        $scope.hetkoznapok[key].reqCleared = isReqCleared(value);
                        $scope.hetkoznapok[key].maxLevel = setMaxLevel(value);
//                        $scope.tudomany[key].maxLevel = $scope.tudomany[key].minLevel < $scope.tudomany[key].maxLevel ? $scope.tudomany[key].maxLevel : $scope.tudomany[key].minLevel;

                    });

                });
                
                myJSONReader.getJart('szakmak').then(function (data) {
                    $scope.szakmak = angular.fromJson(data);
                    angular.forEach(CharService.data.jartassagok, function (value, key) {
                        if ($scope.szakmak.hasOwnProperty(key)) {
                            $scope.szakmak[key] = value;
                        }
                    });
                    angular.forEach($scope.szakmak, function (value, key) {
                        $scope.szakmak[key].reqCleared = isReqCleared(value);
                        $scope.szakmak[key].maxLevel = setMaxLevel(value);
//                        $scope.tudomany[key].maxLevel = $scope.tudomany[key].minLevel < $scope.tudomany[key].maxLevel ? $scope.tudomany[key].maxLevel : $scope.tudomany[key].minLevel;

                    });

                });
                                myJSONReader.getJart('feny').then(function (data) {
                    $scope.feny = angular.fromJson(data);
                    angular.forEach(CharService.data.jartassagok, function (value, key) {
                        if ($scope.feny.hasOwnProperty(key)) {
                            $scope.feny[key] = value;
                        }
                    });
                    angular.forEach($scope.feny, function (value, key) {
                        $scope.feny[key].reqCleared = isReqCleared(value);
                        $scope.feny[key].maxLevel = setMaxLevel(value);
//                        $scope.tudomany[key].maxLevel = $scope.tudomany[key].minLevel < $scope.tudomany[key].maxLevel ? $scope.tudomany[key].maxLevel : $scope.tudomany[key].minLevel;

                    });

                });

                myJSONReader.getOther('infoFegyver').then(function (data) {
                    $scope.fegyver = angular.fromJson(data);
//                    angular.forEach($scope.gyogyitas, function (value, key) {
//                        $scope.gyogyitas[key].reqCleared = isReqCleared(value);
//                        $scope.gyogyitas[key].maxLevel = setMaxLevel(value);
//                    });
                });

                $scope.metod = CharService;
                $scope.char = CharService.data;
                $scope.tempJart = CharService.data.jartassagok;

                $scope.getCost = CharService.getCost;
                $scope.checkJart = function (checked, jart) {
                    if (checked) {
                        jart.have = true;
//                        if (!$scope.tempJart.hasOwnProperty(jart.jartCsop)) {
//                            $scope.tempJart[jart.jartCsop] = {};
//                        }

                        CharService.data.jartassagok[jart.id] = jart;
                    } else {
                        console.log("delete " + jart.id);
                        delete CharService.data.jartassagok[jart.id];
                    }
                }
                var isReqCleared = function (jart) {
                    var ret = true;
                    angular.forEach(jart.reqJart, function (value, key) {

                        ret = ret && $scope.tempJart.hasOwnProperty(value);

                    });
                    return ret;
                }
                $scope.isReqCleared = isReqCleared;

                var setMaxLevel = function (jart) {
                    var ret = CharService.data.jartMaxLevel;
                    if (!jart.hasOwnProperty('minLevel')) {
                        jart.minLevel = 1;
                    }
                    if (CharService.data.kezdo) {
                        if (jart.reqCleared) {
                            angular.forEach(jart.reqJart, function (value, key) {

                                if ($scope.tempJart[value].currentLevel < ret) {
                                    ret = $scope.tempJart[value].currentLevel;
                                }
                            });

                        }
                        if (jart.legacy) {

                            ret = jart.minLevel < CharService.data.jartMaxLevel ? CharService.data.jartMaxLevel : jart.minLevel;
                            if (ret < jart.maxLevel) {
                                ret = jart.maxLevel;
                            }



                        }
                       
                        if (CharService.data.jartMaxLevelMod.hasOwnProperty(jart.jartCsop)) {
                            ret = CharService.data.jartMaxLevelMod[jart.jartCsop];
                        }
                        if (CharService.data.jartMaxLevelMod.hasOwnProperty(jart.id)) {
                            
                            ret = CharService.data.jartMaxLevelMod[jart.id];
                        }

                    } else {
                        ret = 10;
                    }


                    return ret;
                };



                $scope.$watch(function () {
                    return CharService.data.jartassagok;
                }
                , function (newVal, oldVal) {
                    if (!angular.equals(newVal, oldVal)) {

                        angular.forEach($scope.gyogyitas, function (value, key) {
                            $scope.gyogyitas[key].reqCleared = isReqCleared($scope.gyogyitas[key]);
                            $scope.gyogyitas[key].maxLevel = setMaxLevel($scope.gyogyitas[key]);

                        });
                        angular.forEach($scope.ver, function (value, key) {
                            $scope.ver[key].reqCleared = isReqCleared($scope.ver[key]);
                            $scope.ver[key].maxLevel = setMaxLevel($scope.ver[key]);

                        });
                        angular.forEach($scope.tudomany, function (value, key) {
                            $scope.tudomany[key].reqCleared = isReqCleared($scope.tudomany[key]);
                            $scope.tudomany[key].maxLevel = setMaxLevel($scope.tudomany[key]);

                        })
                        CharService.saveData();
                    }
                }, true);
            }]);

        