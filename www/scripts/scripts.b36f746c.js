"use strict";angular.module("arma3SpotterApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","pascalprecht.translate"]),function(){function a(a,d){d.when("/",{templateUrl:"views/spotter.html",controller:"SpotterCtrl",controllerAs:"Spotter",activeTab:"spotter"}).when("/settings",{templateUrl:"views/settings.html",controller:"SettingsCtrl",controllerAs:"Settings",activeTab:"settings"}).otherwise({redirectTo:"/"}),a.translations("en",c).translations("de",b).registerAvailableLanguageKeys(["en","de"],{en_US:"en",en_UK:"en",en_GB:"en",de_DE:"de",de_AT:"de",de_CH:"de"}).preferredLanguage("en")}angular.module("arma3SpotterApp").config(a),a.$inject=["$translateProvider","$routeProvider"];var b={SETTINGS:"Einstellungen",SETTINGS_MOD:"Mod",SETTING_WEAPON:"Waffe",SETTINGS_AMMO:"Munition",SETTINGS_SAVE:"Speichern",SPOTTER:"Spotter",SPOTTER_DISTANCE:"Entfernung",SPOTTER_ANGLE:"Winkel",SPOTTER_HEADWIND:"Gegenwind",SPOTTER_CROSSWIND:"Seitenwind",SPOTTER_TEMPERATURE:"Temperatur",SPOTTER_CALCULATE:"Berechnen",SPOTTER_HORIZONTAL:"Horizontal",SPOTTER_VERTICAL:"Vertikal"},c={SETTINGS:"Settings",SETTINGS_MOD:"Mod",SETTING_WEAPON:"Weapon",SETTINGS_AMMO:"Ammo",SETTINGS_SAVE:"Save",SPOTTER:"Spotter",SPOTTER_DISTANCE:"Distance",SPOTTER_ANGLE:"Angle",SPOTTER_HEADWIND:"Headwind",SPOTTER_CROSSWIND:"Crosswind",SPOTTER_TEMPERATURE:"Temperature",SPOTTER_CALCULATE:"Calculate",SPOTTER_HORIZONTAL:"Horizontal",SPOTTER_VERTICAL:"Vertical"}}(),function(){function a(a,b){function c(){i.activeAmmo=i.Data.getActiveAmmo(),i.activeWeapon=i.Data.getActiveWeapon(),i.activeAmmo||b.logError("activeAmmo not set. No weapon has been selected."),i.activeWeapon||b.logError("activeWeapon not set. No weapon has been selected.")}function d(){if(!i.activeAmmo)return void alert("No weapon has been selected. Please navigate to 'Settings' and select a weapon.");var a=i.Data.getActiveAmmo(),b=Math.min(Math.max(parseInt(i.distance),1),3e3),c=Math.min(Math.max(parseInt(i.angle),0),360),d=Math.min(Math.max(parseFloat(i.headwind),-15),15),e=Math.min(Math.max(parseFloat(i.crosswind),-15),15),f=Math.min(Math.max(parseFloat(i.temperature),-50),50),g=h(a,b,c,d,e,45);if(g[0]<0)return i.resultHorizontal=0,void(i.resultVertical=0);var j=c,k=45;g=h(a,b,c,d,e,f,j);for(var l,m,n=g[0],o=g[1];Math.abs(n)>.1;)g=h(a,b,c,d,e,f,k),l=g[0],o=g[1],m=k-l*(k-j)/(l-n),j=k,k=m,n=l;try{var p=17.77777*(j-c);if(p=Math.round(10*p)/10,isNaN(p))throw"HairOnFire";i.resultVertical=p}catch(q){i.resultVertical=0}try{var r=Math.atan(o/b)*(180/Math.PI)*17.77777;if(r=Math.round(10*r)/10,isNaN(r))throw"HairOnFire";i.resultHorizontal=r}catch(q){i.resultHorizontal=0}}function e(a){return Math.sqrt(Math.pow(a[0],2)+Math.pow(a[1],2)+Math.pow(a[2],2))}function f(a,b){return[a[0]+b[0],a[1]+b[1],a[2]+b[2]]}function g(a,b){return[a[0]*b,a[1]*b,a[2]*b]}function h(a,b,c,d,h,i,j){var k=a.initSpeed,l=a.airFriction,m=a.timeToLive,n=a.simulationStep,o=293.15/(273.15+i);j*=Math.PI/180,c*=Math.PI/180,d*=-1;var p=[Math.cos(c)*b,Math.sin(c)*b,0],q=[0,0,0],r=k*(((i+273.13)/288.13-1)/2.5+1-1),s=[Math.cos(j)*(k+r),Math.sin(j)*(k+r),0];n=Math.min(n,.001);for(var t=Math.floor(m/n),u=0;t>u;u++){var v=e(s);if(s[0]+=n*s[0]*v*l,s[1]+=n*(s[1]*v*l-9.81),s[2]+=n*s[2]*v*l,s=f(f(s,g(s,v*(o-1)*l*n)),g([d,0,h],-1*e(f(s,[d,0,h]))*l*n)),q=f(q,g(s,n)),q[0]>=p[0])break}return[q[1]-p[1],q[2]]}var i=this;i.activeAmmo={},i.activeWeapon={},i.angle=0,i.calculate=d,i.crosswind=0,i.Data=a,i.distance=1e3,i.headwind=0,i.temperature=30,i.resultHorizontal=0,i.resultVertical=0,c()}angular.module("arma3SpotterApp").controller("SpotterCtrl",a),a.$inject=["Data","logger"]}(),function(){function a(a,b,c){function d(){return a.getWeapons().then(function(a){return l.allWeapons=a,l.allWeapons.forEach(function(a){-1===l.mods.indexOf(a.mod)&&l.mods.push(a.mod)}),l.mods.sort(function(a,b){return a>b?1:-1}),h(),l.allWeapons})}function e(){c.setActiveWeapon(l.activeWeapon),c.setActiveAmmo(l.activeAmmo)}function f(){l.weapons=[],l.allWeapons.forEach(function(a){a.mod===l.activeMod&&l.weapons.push(a)}),l.weapons.sort(function(a,b){return a.name>b.name?1:-1}),i()}function g(){var a=b.getItem("activeAmmo");if(a){for(var c=!1,d=0;d<l.ammos.length;d++)if(l.ammos[d].name===a.name){l.activeAmmo=l.ammos[d],c=!0;break}c===!1&&(l.activeAmmo=l.ammos[0])}else l.activeAmmo=l.ammos[0];e()}function h(){var a=b.getItem("activeMod");if(a&&""!==a){var c=l.mods.indexOf(a);l.activeMod=c>=0&&l.mods.length>c?l.mods[c]:l.mods[0]}else l.activeMod=l.mods[0];f()}function i(){var a=b.getItem("activeWeapon");if(a){for(var c=!1,d=0;d<l.weapons.length;d++)if(l.weapons[d].name===a.name){l.activeWeapon=l.weapons[d],c=!0;break}c===!1&&(l.activeWeapon=l.weapons[0])}else l.activeWeapon=l.weapons[0];j()}function j(){l.ammos=l.activeWeapon.magazines,l.ammos.sort(function(a,b){return a.name>b.name?1:-1}),g()}function k(){b.setItem("activeMod",l.activeMod),b.setItem("activeWeapon",l.activeWeapon),b.setItem("activeAmmo",l.activeAmmo)}var l=this;l.activeAmmo="",l.activeMod="",l.activeWeapon="",l.allWeapons=[],l.ammoChanged=e,l.ammos=[],l.modChanged=f,l.mods=[],l.saveConfig=k,l.weaponChanged=j,l.weapons=[],d()}angular.module("arma3SpotterApp").controller("SettingsCtrl",a),a.$inject=["DataService","StorageService","Data"]}(),function(){function a(a,b){function c(){return a.get("data/weapons.json").then(d).catch(e)}function d(a){return a.data}function e(a){b.logError("XHR failed for getWeapons."+a.data)}return{getWeapons:c}}angular.module("arma3SpotterApp").factory("DataService",a),a.$inject=["$http","logger"]}(),function(){function a(){return{logError:function(a){console.log(a)}}}angular.module("arma3SpotterApp").service("logger",a)}(),function(){function a(){function a(a){if(!a||""===a)throw new Error("StorageService.getItem: Key is empty!");var b=localStorage.getItem(a);if(b&&""!==b){var c=JSON.parse(b);return c.item}return null}function b(a,b){if(!a||""===a)throw new Error("StorageService.setItem: Key is empty!");if(!b)throw new Error("StorageService.setItem: Item is null!");"object"==typeof b?localStorage.setItem(a,JSON.stringify({type:"object",item:b})):"string"==typeof b&&localStorage.setItem(a,JSON.stringify({type:"string",item:b}))}return{getItem:a,setItem:b}}angular.module("arma3SpotterApp").factory("StorageService",a)}(),function(){function a(a){function b(){if(!f.activeAmmo){var b=a.getItem("activeAmmo");d(b)}return f.activeAmmo}function c(){if(!f.activeWeapon){var b=a.getItem("activeWeapon");e(b)}return f.activeWeapon}function d(a){a&&"object"==typeof a&&(f.activeAmmo=a)}function e(a){a&&"object"==typeof a&&(f.activeWeapon=a)}var f={activeWeapon:null,activeAmmo:null};return{getActiveAmmo:b,getActiveWeapon:c,setActiveAmmo:d,setActiveWeapon:e}}angular.module("arma3SpotterApp").factory("Data",a),a.$inject=["StorageService"]}(),function(){function a(a){var b=this;b.route=a}angular.module("arma3SpotterApp").controller("HeaderCtrl",a),a.$inject=["$route"]}();