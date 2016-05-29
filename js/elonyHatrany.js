

angular.module('myApp.elonyHatrany', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/elonyHatrany', {
                    templateUrl: 'html/elonyHatrany.html',
                    controller: 'JartCTRL'
                });
            }])

        .controller('JartCTRL', ['$scope', 'myJSONReader', 'CharService', function ($scope, myJSONReader, CharService) {
                myJSONReader.getOther('elonyok').then(function (data) {
                    if (data.hasOwnProperty('kimagaslogyorsasag')) {
                        data['kimagaslogyorsasag'].modMin = CharService.data.speed.max;
                        data['kimagaslogyorsasag'].modMax = CharService.data.speed.base;
                        data['kimagaslogyorsasag'].modCurrent = CharService.data.speed.current;
                        data['kimagaslogyorsasag'].costMax = 300;
                    }
                    $scope.elonyok = data;
                });
                myJSONReader.getOther('hatranyok').then(function (data) {
                    if (data.hasOwnProperty('fajilassusag')) {
                        data['fajilassusag'].modMin = CharService.data.speed.base;
                        data['fajilassusag'].modMax = CharService.data.speed.min;
                        data['fajilassusag'].modCurrent = CharService.data.speed.current;
                        data['fajilassusag'].costMax = 300;
                    }
                    $scope.hatranyok = data;
                });
                $scope.char = CharService.data;
                $scope.metod = CharService;
                $scope.Math = Math;

                $scope.hasElonyHatrany = function (eh) {
                    if (CharService.data.elonyHatrany.hasOwnProperty(eh.id)) {
                        return true;
                    } else {
                        return false;
                    }
                };
                $scope.checkElonyHatrany = function (checked, eh) {
                    if (checked) {
                        console.log("add " + eh.id);
                        CharService.data.elonyHatrany[eh.id] = eh;
                        if (angular.equals(eh.id, 'kimagaslogyorsasag') || angular.equals(eh.id, 'fajilassusag')) {
                            CharService.data.speed.current = eh.modCurrent;
                        }
                        CharService.data.jartassagMod[eh.modType] = CharService.data.jartassagMod[eh.modType] + eh.modCurrent;

                    } else {
                        console.log("delete " + eh.id);
                        if (CharService.data.elonyHatrany.hasOwnProperty(eh.id)) {
                            if (angular.equals(eh.id, 'kimagaslogyorsasag') || angular.equals(eh.id, 'fajilassusag')) {
                                CharService.data.speed.current = CharService.data.speed.base;
                            }
                            CharService.data.jartassagMod[eh.modType] = CharService.data.jartassagMod[eh.modType] - eh.modCurrent;
                            delete CharService.data.elonyHatrany[eh.id];
                        }
                    }
                };
                $scope.getEHCost = function (elony, temp) {
                    if (angular.equals(elony.id, 'kimagaslogyorsasag')) {
                       // console.log(elony.modCurrent);
                        elony.costCurrent = (CharService.data.speed.base - Math.abs(elony.modCurrent)) * elony.costStep;
                    } else if (elony.modMin == 4 && elony.modMax == 7) {
                        elony.costCurrent = elony.costMin - (elony.costStep * (temp - elony.modMax) / Math.abs(elony.modStep));
                    } else if (elony.modStep) {
                        elony.costCurrent = elony.costMin + (elony.costStep * (temp - elony.modMin) / Math.abs(elony.modStep));
                    } else {
                        elony.costCurrent = elony.costMin + (elony.costStep * temp);
                    }
                    return elony.costCurrent;
                }


                $scope.isDisabled = function (eh) {

                    for (var i = 0; i < eh.forbiddenRaces.length; i++) {

                        if (angular.equals(eh.forbiddenRaces[i], CharService.data.faj)) {

                            return true;

                        }
                    }

                    return false;
                }
                $scope.$watch(function () {
                    return CharService.data;
                }
                , function (newVal, oldVal) {
//                     if (isEmpty(newVal)) {

                    CharService.saveData();
                }, true);


            }]);