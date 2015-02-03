// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
 	var db = null;
 
angular.module('starter', ['ionic', 'ngCordova'])


.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
          url: "/signin",
          templateUrl: "signin.html",
          controller: 'SignInCtrl'
        })

    
        .state('welcome', {
          url: "/welcome",
          templateUrl: "welcome.html",
		   controller: 'welcomeCtrl'
		  
        })
		
	
    
    $urlRouterProvider.otherwise("/signin");
})

.controller('SignInCtrl', function($scope, $state, $http,$cordovaSQLite,$location) {

  $scope.insert = function() {
  alert("Call Method");
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, ['Enamul', 'Haque']).then(function(res) {
		 alert("Insert Method");
            console.log("INSERT ID -> " + res.insertId);
        }, function (err) {
		 alert("Failure");
            console.error(err);
        });
    }
 
    $scope.select = function() {
	 alert("Call Method");
        var query = "SELECT firstname, lastname FROM people ";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
			 alert("Select Method");
                console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
			 alert("Error Method");
        });
    }
})
.controller('welcomeCtrl', function($scope, $state, $http,$ionicLoading) {

})

   .run(function($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
            db = $cordovaSQLite.openDB({ name: "my.db" });
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
        });
    });