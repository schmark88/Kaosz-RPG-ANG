/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('myApp.karakter', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/karakter', {
                    templateUrl: 'html/karakter.html',
                    controller: 'karakterCtrl'
                });
            }])

        .controller('karakterCtrl', ['$scope', 'CharService', 'myJSONReader', function ($scope, CharService, myJSONReader) {
                $scope.char = CharService;
                $scope.metod = CharService;
                $scope.Math = Math;



                $scope.saveToPc = function (data, filename) {

                    if (!data) {
                        console.error('No data');
                        return;
                    }

                    if (!filename) {
                        filename = 'download.json';
                    }

                    if (typeof data === 'object') {
                        data = JSON.stringify(data, undefined, 2);
                    }

                    var blob = new Blob([data], {type: 'text/json'}),
                            e = document.createEvent('MouseEvents'),
                            a = document.createElement('a');

                    a.download = filename;
                    a.href = window.URL.createObjectURL(blob);
                    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                    e.initEvent('click', true, false, window,
                            0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    a.dispatchEvent(e);
                };
            }]);
