

angular.module('myApp.felszereles', ['ngRoute'])

        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/felszereles', {
                    templateUrl: 'html/felszereles.html',
                    controller: 'felszCtrl'
                });
            }])

        .controller('felszCtrl', ['$scope','$filter' ,'myJSONReader', 'CharService', function ($scope,$filter, myJSONReader, CharService) {
                $scope.felszCSoportok = [];
                myJSONReader.getOther('felszereles').then(function (data) {
                    $scope.felszerelesek = angular.fromJson(data);
                    angular.forEach($scope.felszerelesek, function (value, key) {
                        
                        if($scope.felszCSoportok.lastIndexOf(value.csoport)==-1){
                            $scope.felszCSoportok.push(value.csoport);
                        }
                    });
                });
                                myJSONReader.getOther('fegyvert').then(function (data) {
                    $scope.fegyvert = angular.fromJson(data);

                });
                $scope.kosar= [];
               
                $scope.addKosar = function (felsz,currency,quantity,price){
                    var item = {};
//                    if(currency=="arany"){
//                        price = price*100;
//                    }else if( currency=="ezüst"){
//                        price = price *10;
//                    }else if (currency == "réz"){
//                        
//                    }else{
//                        console.error("No such currency");
//                    }
                    item.id=felsz.id+price+currency;
                    var found = $filter('filter')($scope.kosar, {id: item.id}, true);
                    if(found.length){
                        
                        found[0].quantity = found[0].quantity + quantity;
                    }else{
                        item.name = felsz.name;
                        item.quantity = quantity;
                        item.price = price;
                        item.currency = currency;
                        $scope.kosar.push(item);
                        
                    }
                } 
                $scope.getVegosszeg = function(){
                    var sum = 0;
                    var price = 0;
                    angular.forEach($scope.kosar, function (value, key) {
                                            if(value.currency=="arany"){
                        price = value.price*100;
                    }else if( value.currency=="ezüst"){
                       price = value.price *10;
                    }else{
                        price = value.price;
                    }
                    sum = sum + (price*value.quantity);
                    });
                    var arany = Math.floor(sum/100);
                    var ezust = Math.floor(sum%100/10);
                    var rez = sum%10;
                    var ret ="";
                    if(arany>0){
                        ret = ret+arany+" arany";
                    }
                                        if(ezust>0){
                        ret = ret+ezust+" ezüst";
                    }
                                                            if(rez>0){
                        ret =ret+rez+" réz";
                    }
                    return ret;
                }
                $scope.deleteItem=function(item){
                     $scope.kosar.splice($scope.kosar.indexOf(item),1);
                }
                
               
            }]);

        