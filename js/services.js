/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("services", [])

        .factory('CharService', ['myJSONReader', '$window', function (myJSONReader, $window) {
                var KEY = "ChaosChar";
                var charService = {};
                charService.data = {};
                charService.data.baseJP = 10000;
                charService.data.baseFP = 220;
                charService.data.jP = charService.data.baseJP;
                charService.data.fP = charService.data.baseFP;
                charService.data.faj = '';
                charService.data.name = '';
                charService.data.speed = {"base": 0, "min": 0, "max": 0, "current": 0};
                charService.data.age = {"juvenis": 0, "seniorMin": 2, "seniorMax": 0, "current": 0};
                charService.data.maxHP = 0;
                charService.data.maxEP = 0;
                charService.seniorBaseJPRate = 200;
                charService.seniorDiffJPRate = 300;
                charService.seniorBaseFPRate = 80;
                charService.seniorDiffFPRate = -30;
                charService.juvBaseJPRate = 30;
                charService.juvDiffJPRate = 50;
                charService.juvBaseFPRate = 50;
                charService.juvDiffFPRate = 30;
                charService.data.summary = '';
                charService.data.kezdo = true;
                charService.data.jartMaxLevel = 3;
                charService.data.jartMaxLevelMod = {};
                charService.data.jartassagMod = {};
                charService.data.jartassagok = {};
                charService.data.elonyHatrany = {};
                charService.data.rend = {};
                charService.data.praktikus = {};
                charService.data.bonusJart = {};
                charService.data.penz = 50;
                charService.data.specials = {};
                charService.data.foertekek = {};
                charService.data.foertekekFinal = {};
                charService.getJartById = function () {
                    var jartassagokT = {};
                    myJSONReader.getJart('tudomany').then(function (data) {
                        angular.extend(jartassagokT, data);
                        myJSONReader.getJart('gyogyitas').then(function (data1) {
                            angular.extend(jartassagokT, data1);
                            myJSONReader.getJart('ver').then(function (dataV) {
                                angular.extend(jartassagokT, dataV);
                                
                                                            myJSONReader.getJart('ejszaka').then(function (dataE) {
                                angular.extend(jartassagokT, dataE);
                                                                                            myJSONReader.getJart('feny').then(function (dataF) {
                                angular.extend(jartassagokT, dataF);
                                                                                            myJSONReader.getJart('hetkoznapok').then(function (dataH) {
                                angular.extend(jartassagokT, dataH);
                                                                                            myJSONReader.getJart('szakmak').then(function (dataSz) {
                                angular.extend(jartassagokT, dataSz);
                                charService.jartassagT = jartassagokT;
                            });
                            });
                            });
                            });
                            });
                        });
                    });
                }
                charService.getJartById();
                charService.getAllJartCost = function () {
                    var cost = 0;
                    angular.forEach(charService.data.jartassagok, function (value, key) {

                        cost = cost + charService.getCost(value, value.currentLevel);
                        
                    });
                    return cost;
                }


                charService.getJP = function () {
                    var jp = 0 + this.data.jP;
//                    console.log(jp);
                    if (!angular.equals({}, this.data.jartassagok)) {
                        jp = jp - this.getAllJartCost();
                        
                    }
                    angular.forEach(charService.data.bonusJart, function (value, key) {

                        jp = jp + charService.getCost(value, value.minLevel);
                    });
                    angular.forEach(charService.data.elonyHatrany, function (value, key) {

                        jp = jp + value.costCurrent;
                    });
                    angular.forEach(charService.data.praktikus, function (value, key) {

                        jp = jp - value.cost;
                    });
                    if (charService.data.rend.hasOwnProperty('cost')) {
                        jp = jp - charService.data.rend.cost;
                    }
                    return jp;
                }

                charService.getCostMod = function (jart, index) {
                    var mod = 1;
                    var ertek = charService.data.foertekekFinal[jart.reqFoertekId];
                    var rertek = jart.req[index - 1];
                    if (ertek < rertek - 20) {
                        mod = 2;
                    } else if (rertek - 20 <= ertek && ertek < rertek - 10) {
                        mod = 1.3;
                    } else if (rertek - 10 <= ertek && ertek < rertek) {
                        mod = 1.15;
                    } else if (rertek + 20 <= ertek && ertek < rertek + 30) {
                        mod = 0.85;
                    } else if (ertek > rertek + 30) {
                        mod = 0.7;
                    }
                    angular.forEach(jart.costMod, function (value, key) {
                        if (charService.data.jartassagMod.hasOwnProperty(value)) {
                            mod = mod + (charService.data.jartassagMod[value] / 100);
                        }
                        angular.forEach(charService.data.elonyHatrany, function (value2, key) {
                            if (angular.equals(value2.modType, value)) {
                                mod = mod + (value2.modCurrent / 100);
                            }
                        });
                    });
                    return mod;
                };
                charService.getCost = function (jart, index) {

                    var cost = 0;
                    if (jart.hasOwnProperty('fegyvercsop')) {
                        angular.forEach(jart.fegyvercsop, function (value, key) {

                            if (value.have) {

                                for (i = 0; i < value.atk; i++) {
                                    cost = cost + Math.round(jart.cost[i] * charService.getCostMod(jart, i));
                                }
                                for (i = 0; i < value.def; i++) {
                                    cost = cost + Math.round(jart.cost[i] * charService.getCostMod(jart, i));
                                }
                            }

                        });
                    } else if (jart.hasOwnProperty('csoportok')) {
                        angular.forEach(jart.csoportok, function (value, key) {

                            if (value.have) {

                                for (i = 0; i < value.currentLevel; i++) {
                                    cost = cost + Math.round(jart.cost[i] * charService.getCostMod(jart, i));
                                }
                            }

                        });
                    } else {
//                        console.log(jart.id + " " + cost);
                        for (i = 0; i < index; i++) {
                            cost = cost + Math.round(jart.cost[i] * charService.getCostMod(jart, i));
//                            console.log(jart.id + " " + cost + " index:" + index + " i:" + i);
                        }

                    }

                    return cost;
                };
                charService.getFP = function () {
                    var specialsCost = 0;
                    angular.forEach(this.data.specials, function (value, key) {
                        if (value.have) {
                            specialsCost = specialsCost + value.cost;
                        }

                    });
                    return this.data.fP - specialsCost;
                }

                charService.saveData = function () {
                                       
                    charService.finalizeFoertekek();
                    charService.data.maxHP = charService.data.foertekekFinal['fizikum'];
                    if(charService.data.jartassagok.hasOwnProperty("esszenciapajzsaktivizalas")){
                        charService.data.maxEP = Math.round(charService.data.foertekekFinal['esszenciapajzs'] * (0.2+(0.1*charService.data.jartassagok.esszenciapajzsaktivizalas.currentLevel)));
                    }else{
                        charService.data.maxEP = Math.round(charService.data.foertekekFinal['esszenciapajzs'] * 0.2);
                    }
                    console.log("HP:"+charService.data.maxHP);
                    console.log("EP:"+charService.data.maxEP +"  EszcPaFő:"+charService.data.foertekekFinal['esszenciapajzs']);
                    
                    $window.sessionStorage.setItem(KEY, angular.toJson(charService.data));
                }

                charService.loadData = function () {
                    var mydata = $window.sessionStorage.getItem(KEY);
//                    console.log(mydata);
                    if (mydata) {
                        mydata = angular.fromJson(mydata);
                        charService.data = mydata;
                        angular.forEach(mydata.foertekek, function (value, key) {
                            charService.data.foertekek[key] = new BaseFoertek(value, charService.incFP, charService.decFP);
                        });
                    }

                }

                charService.finalizeFoertekek = function () {
                    console.log("finalalize");
                    this.data.foertekekFinal.fizikum = this.data.foertekek.fizikum.value;
                    this.data.foertekekFinal.ero = this.data.foertekek.fizikum.activeValue;
                    this.data.foertekekFinal.szivossag = this.data.foertekek.fizikum.passiveValue;
                    this.data.foertekekFinal.ratermettseg = this.data.foertekek.ratermettseg.value;
                    this.data.foertekekFinal.ugyesseg = this.data.foertekek.ratermettseg.activeValue;
                    this.data.foertekekFinal.reflex = this.data.foertekek.ratermettseg.passiveValue;
                    this.data.foertekekFinal.tudat = this.data.foertekek.tudat.value;
                    this.data.foertekekFinal.intelligencia = this.data.foertekek.tudat.activeValue;
                    this.data.foertekekFinal.lelkiero = this.data.foertekek.tudat.passiveValue;
                    this.data.foertekekFinal.esszencia = this.data.foertekek.esszencia.value;
                    this.data.foertekekFinal.varazsero = this.data.foertekek.esszencia.activeValue;
                    this.data.foertekekFinal.esszenciapajzs = this.data.foertekek.esszencia.passiveValue;
                }
                charService.addBonusJart = function (key, value) {
                    if (charService.jartassagT.hasOwnProperty(key)) {
                        charService.data.bonusJart[key] = charService.jartassagT[key];
                        if (charService.data.jartMaxLevelMod.hasOwnProperty(key)) {
                            charService.data.bonusJart[key].maxLevel = charService.data.jartMaxLevelMod[key];
                        } else {
                            charService.data.bonusJart[key].maxLevel = charService.data.jartMaxLevel;
                        }
                        if (value.hasOwnProperty("fegyvercsop")) {

                            angular.forEach(value.fegyvercsop, function (value2, key2) {
                                if (value2.atk > charService.data.bonusJart[key].maxLevel) {
                                    charService.data.bonusJart[key].maxLevel = value2.atk;
                                }
                                charService.data.bonusJart[key].fegyvercsop[key2].atk = value2.atk;
                                charService.data.bonusJart[key].fegyvercsop[key2].def = value2.def;
                                charService.data.bonusJart[key].fegyvercsop[key2].have = value2.have;
                                if (value2.have) {
                                    charService.data.bonusJart[key].fegyvercsop[key2].legacy = true;
                                    charService.data.bonusJart[key].fegyvercsop[key2].atkMin = value2.atk;
                                    charService.data.bonusJart[key].fegyvercsop[key2].defMin = value2.def;
                                } else {
                                    charService.data.bonusJart[key].fegyvercsop[key2].legacy = false;
                                    charService.data.bonusJart[key].fegyvercsop[key2].atkMin = 1;
                                    charService.data.bonusJart[key].fegyvercsop[key2].defMin = 1;
                                }
                            });

                            charService.data.bonusJart[key].have = true;
                            charService.data.bonusJart[key].legacy = true;
                            charService.data.jartassagok[key] = charService.data.bonusJart[key];

                        } else if (value.hasOwnProperty("csoportok")) {

                            angular.forEach(value.csoportok, function (value2, key2) {
                                charService.data.bonusJart[key].csoportok[key2].level = value2.level;

                                charService.data.bonusJart[key].csoportok[key2].have = value2.have;

                                if (value2.have) {
                                    charService.data.bonusJart[key].csoportok[key2].legacy = true;
                                    charService.data.bonusJart[key].csoportok[key2].minLevel = value2.level;

                                } else {
                                    charService.data.bonusJart[key].csoportok[key2].legacy = false;
                                    charService.data.bonusJart[key].csoportok[key2].minLevel = 1;

                                }
                            });

                            charService.data.bonusJart[key].have = true;
                            charService.data.bonusJart[key].legacy = true;
                            charService.data.jartassagok[key] = charService.data.bonusJart[key];
                        } else {

                            charService.data.bonusJart[key].minLevel = value.level;
                            charService.data.bonusJart[key].currentLevel = value.level;
                            charService.data.bonusJart[key].have = true;
                            charService.data.bonusJart[key].legacy = true;
                            charService.data.jartassagok[key] = charService.data.bonusJart[key];
                        }
                    } else {
                        console.log("Jartassag not found:" + key);
                    }
                }
                
                charService.removeBonusJart = function (key) {
                    delete charService.data.bonusJart[key];
                    delete charService.data.jartassagok[key];
                }
                
                charService.setRace = function (fajDTO) {
                    this.data.faj = fajDTO.race;
                    if (this.data.faj == 'ember') {
                        this.data.jartMaxLevel = 4;
                    } else {
                        this.data.jartMaxLevel = 3;
                    }
                    charService.data.name = '';
                    charService.data.age.current = 0;
                    charService.data.specials = {};
                    charService.data.bonusJart = {};
                    charService.data.rend = {};
                    charService.data.praktikus = {};
                    charService.data.jartassagok = {};
                    charService.data.jartassagMod = {};
                    charService.data.jartMaxLevelMod = {};

                    angular.forEach(fajDTO.jartMaxLevelMod, function (value, key) {
                        charService.data.jartMaxLevelMod[key] = value;
                    });

                    var nyelv = {};
                    nyelv.level = 5;
                    charService.addBonusJart("anyanyelvismeret", nyelv);
                    angular.forEach(fajDTO.bonusJart, function (value, key) {

                        charService.addBonusJart(key, value);
                    });
                    charService.data.fP = charService.data.baseFP;
                    angular.forEach(fajDTO.foertekek, function (value, key) {
                        charService.data.foertekek[key] = new BaseFoertek(value, charService.incFP, charService.decFP);
                        charService.data.fP = charService.data.fP - value.min;
                    });
                    this.data.summary = fajDTO.summary;
                    angular.forEach(fajDTO.specials, function (value, key) {
                        charService.data.specials[key] = value;
                        charService.data.specials[key].have = false;
                    });
                    angular.forEach(fajDTO.jartMod, function (value, key) {
                        charService.data.jartassagMod[key] = value;
                    });
                    this.data.speed.base = fajDTO.speed.base;
                    this.data.speed.max = fajDTO.speed.max;
                    this.data.speed.min = fajDTO.speed.min;
                    this.data.speed.current = fajDTO.speed.base;
                    this.data.age.juvenis = fajDTO.age.juvenis;
                    this.data.age.seniorMin = fajDTO.age.seniorMin;
                    this.data.age.seniorMax = fajDTO.age.seniorMax;
                };
                charService.setAge = function (fajDTO, age) {
                    this.data.faj = fajDTO.race;
                    charService.data.fP = charService.data.baseFP;
                    charService.data.jP = charService.data.baseJP;
                    charService.data.age.current = age;
                    if (age <= this.data.age.juvenis) {
                        charService.data.jartMaxLevel = 3;
                        this.data.jP = Math.round(this.data.baseJP * (this.juvBaseJPRate + ((this.data.age.current) * (this.juvDiffJPRate / this.data.age.juvenis))) / 100);
                        this.data.fP = Math.round(this.data.baseFP * (this.juvBaseFPRate + ((this.data.age.current) * (this.juvDiffFPRate / this.data.age.juvenis))) / 100);
                        angular.forEach(fajDTO.foertekek, function (value, key) {
                            charService.data.foertekek[key] = new BaseFoertek(value, charService.incFP, charService.decFP);
                            charService.data.fP = charService.data.fP - value.min;
                        });
                    } else
                    if (age >= this.data.age.seniorMin) {

                        var fPR = (this.seniorBaseFPRate + ((this.data.age.current - this.data.age.seniorMin) * (this.seniorDiffFPRate / (this.data.age.seniorMax - this.data.age.seniorMin)))) / 100;
                        charService.data.jartMaxLevel = 6 + Math.round(fPR);
                        //= {"fizikum":0,"ratermettseg":0,"tudat":0,"esszencia":0}

                        this.data.jP = Math.round(this.data.baseJP * (this.seniorBaseJPRate + ((this.data.age.current - this.data.age.seniorMin) * (this.seniorDiffJPRate / (this.data.age.seniorMax - this.data.age.seniorMin)))) / 100);
                        this.data.fP = Math.round(this.data.baseFP * fPR);
                        fajDTO.foertekek.fizikum.min = Math.round(fajDTO.foertekek.fizikum.min * (1 - (1 - fPR)));
                        fajDTO.foertekek.ratermettseg.min = Math.round(fajDTO.foertekek.ratermettseg.min * (1 - (1 - fPR)));
                        fajDTO.foertekek.tudat.max = Math.round(fajDTO.foertekek.tudat.max * (1 + (1 - fPR)));
                        fajDTO.foertekek.esszencia.max = Math.round(fajDTO.foertekek.esszencia.max * (1 + (1 - fPR)));
                        angular.forEach(fajDTO.foertekek, function (value, key) {
                            charService.data.foertekek[key] = new BaseFoertek(value, charService.incFP, charService.decFP);
                            charService.data.fP = charService.data.fP - value.min;
                        });
                    } else {
                        charService.data.jartMaxLevel = 3;
                        angular.forEach(fajDTO.foertekek, function (value, key) {
                            charService.data.foertekek[key] = new BaseFoertek(value, charService.incFP, charService.decFP);
                            charService.data.fP = charService.data.fP - value.min;
                        });
                    }


                };
                charService.decFP = function () {
                    charService.data.fP = charService.data.fP - 1;
                };
                charService.incFP = function () {

                    charService.data.fP = charService.data.fP + 1;
                };
                charService.loadData();
                return charService;
            }])
        .factory('GMService', ['myJSONReader', '$window', function (myJSONReader, $window) {
                var GMService = {};
                var KEY = "GMsave";
                GMService.data = {};
                GMService.data.jatekosok = {};
                GMService.data.npck = {};
                GMService.data.harcban = {};

                GMService.saveData = function () {

                    $window.sessionStorage.setItem(KEY, angular.toJson(GMService.data));
                };

                GMService.loadData = function () {
                    var mydata = $window.sessionStorage.getItem(KEY);

                    if (mydata) {
                        mydata = angular.fromJson(mydata);
                        GMService.data = mydata;

                    }

                };
                GMService.loadData();

                GMService.getZafirTable = function (jszint, nehezseg) {
                    var base = 90;
                    if (jszint === nehezseg) {
                        return base;
                    } else if (jszint === nehezseg + 1) {
                        return base;
                    } else if (jszint > nehezseg + 1) {
                        return base + 5;
                    } else if (jszint + 1 === nehezseg) {
                        return base - 15;
                    } else if (jszint + 2 === nehezseg) {
                        return base - 55;
                    } else if (jszint + 3 === nehezseg) {
                        return base - 75;
                    } else if (jszint + 3 < nehezseg) {
                        return base - 85;
                    }


                }

                GMService.getRubinTable = function (jszint, nehezseg) {
                    var base = 55;
                    if (jszint === 0) {
                        if (jszint === nehezseg) {
                            return 45;
                        } else if (jszint + 1 === nehezseg) {
                            return 25;
                        } else if (jszint < nehezseg) {
                            return 5;
                        }
                    }
                    if (nehezseg === 0) {
                        return 95;
                    }

                    if (jszint === nehezseg) {
                        return base;
                    } else if (jszint === nehezseg + 1) {
                        return base + 10;
                    } else if (jszint === nehezseg + 2) {
                        return base + 20;
                    } else if (jszint > nehezseg + 2) {
                        return base + 30;
                    } else if (jszint + 1 === nehezseg) {
                        return base - 10;
                    } else if (jszint + 2 === nehezseg) {
                        return base - 20;
                    } else if (jszint + 3 === nehezseg) {
                        return base - 30;
                    } else if (jszint + 4 === nehezseg) {
                        return base - 40;
                    } else if (jszint + 4 < nehezseg) {
                        return base - 50;
                    }


                }

                GMService.getSmaragdTable = function (jszint, nehezseg) {
                    var mod = Math.floor(nehezseg / 4);
                    var base = 85 + (5 * mod);
                    if (jszint === nehezseg) {
                        return base;
                    } else if (mod === 0) {
                        if (jszint > nehezseg) {
                            return base + 5;
                        } else if (jszint + 1 === nehezseg) {
                            return base - 60;
                        } else if (jszint + 2 === nehezseg) {
                            return base - 80;
                        }
                        if (jszint + 2 < nehezseg) {
                            return 1;
                        }
                    } else if (mod === 1) {
                        if (jszint > nehezseg) {
                            return base + 7;
                        } else if (jszint === nehezseg + 1) {
                            return base + 5;
                        } else if (jszint + 1 === nehezseg) {
                            return base - 55;
                        } else if (jszint + 2 === nehezseg) {
                            return base - 85;
                        } else if (jszint + 2 < nehezseg) {
                            return 1;
                        }
                    } else if (mod === 2) {
                        if (jszint === nehezseg + 1) {
                            return base + 2;
                        } else if (jszint > nehezseg) {
                            return base + 4;
                        } else if (jszint + 1 === nehezseg) {
                            return base - 40;
                        } else if (jszint + 2 === nehezseg) {
                            return base - 80;
                        } else if (jszint + 2 < nehezseg) {
                            return 1;
                        }
                    }




                }
                return GMService;
            }])
        .factory('myJSONReader', function ($http, $q) {

            this.getOther = function (fileName) {
                var deferred = $q.defer();
                $http.get('json/' + fileName + '.json').success(function (data) {
                    deferred.resolve(data);
                }).error(function () {
                    deferred.reject();
                });
                return deferred.promise;
            }
            this.getJart = function (fileName) {
                var deferred = $q.defer();
                $http.get('json/jartassag/' + fileName + '.json').success(function (data) {
                    deferred.resolve(data);
                }).error(function () {
                    deferred.reject();
                });
                return deferred.promise;
            },
                    this.getRace = function (fileName) {
                        var deferred = $q.defer();
                        $http.get('json/races/' + fileName + '.json').success(function (data) {
                            deferred.resolve(data);
                        }).error(function () {
                            deferred.reject();
                        });
                        return deferred.promise;
                    };
            return this;
        })
        .factory('BaseFoertek', BaseFoertek)
        .factory('mydata', function () {
            return{
                message: "what is it?"
            };
        });
function BaseFoertek(foertekValues, incFP, decFP) {
    this.id = foertekValues.id;
    //this.passiveName = foertek.passivName;
//    this.activeName = foertek.activeName;
//    this.nameDesc = foertekText.foertekDesc;
//    this.activeDesc = foertekText.activeDesc;
//    this.passiveDesc = foertekText.passiveDesc;
    if (foertekValues.value) {
        this.value = foertekValues.value;
    } else {
        this.value = foertekValues.min;
    }
    if (foertekValues.activeValue) {
        this.activeValue = foertekValues.activeValue;
    } else {
        this.activeValue = foertekValues.min;
    }
    if (foertekValues.passiveValue) {
        this.passiveValue = foertekValues.passiveValue;
    } else {
        this.passiveValue = foertekValues.min;
    }
    this.min = foertekValues.min;
    this.max = foertekValues.max;
    this.incValue = function () {
        if (this.value < this.max) {
            this.value = this.value + 1;
            this.passiveValue = this.passiveValue + 1;
            this.activeValue = this.activeValue + 1;
            decFP();
        }
        if (this.passiveValue < this.value * 0.8 || this.passiveValue > this.value * 1.2) {
            this.activeValue = this.value;
            this.passiveValue = this.value;
        }
    };
    this.decValue = function () {
        if (this.value > this.min) {
            this.value = this.value - 1;
            this.passiveValue = this.passiveValue - 1;
            this.activeValue = this.activeValue - 1;
            incFP();
        }
        if (this.passiveValue < this.value * 0.8 || this.passiveValue > this.value * 1.2) {
            this.activeValue = this.value;
            this.passiveValue = this.value;
        }
    };
    this.incPassiveValue = function () {
        if (this.passiveValue < this.value * 1.2) {
            this.passiveValue = this.passiveValue + 1;
            this.activeValue = this.activeValue - 1;
        }
    };
    this.decPassiveValue = function () {
        if (this.passiveValue > this.value * 0.8) {
            this.passiveValue = this.passiveValue - 1;
            this.activeValue = this.activeValue + 1;
        }
    };
    this.incActiveValue = function () {
        if (this.activeValue < this.value * 1.2) {
            this.passiveValue = this.passiveValue - 1;
            this.activeValue = this.activeValue + 1;
        }
    };
    this.decActiveValue = function () {
        if (this.activeValue > this.value * 0.8) {
            this.activeValue = this.activeValue - 1;
            this.passiveValue = this.passiveValue + 1;
        }
    };
}
;
