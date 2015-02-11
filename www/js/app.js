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

.controller('SignInCtrl', function($scope, $state, $http, $rootScope,$ionicLoading,$filter,$ionicPopup, $timeout,$cordovaSQLite) {


	

		




 $scope.Sync = function() {
		$ionicLoading.show({
                template: 'Please Wait..'
            });
			$http({
				  method: 'GET',
				 
				  url: 'http://202.40.190.14:8084/OracleDatabaseLatLng/LatLngSV',
				  //params: {mailID:mailID,sessiongID:sessionID,companyCode:'001',accountNo:$scope.sourceAccount},
				  //type:'JSON',				  
				  headers : { 'Content-Type': 'application/json' }
				}).success(function(data, status, headers, config) {
					//alert(data.accountDetailsSelectedByAccountNodes[0].accountTitle);   
						//$scope.accountDetailsSelectedByAccountNodes = data.accountDetailsSelectedByAccountNodes; // response data
						$rootScope.latLngNodes = data.latLngNodes; // response data
						$rootScope.responseArr = [];
						angular.forEach(data.latLngNodes, function(latLngNodes, index) {
							 $ionicLoading.hide();
								alert(latLngNodes.branchCode+db);								
							var query = "INSERT INTO branch_info (branch_code, branch_name,branch_address,branch_phone,branch_fax) VALUES (?,?,?,?,?)";
							$cordovaSQLite.execute(db, query, [latLngNodes.branchCode, latLngNodes.branchName,latLngNodes.bracnAddress,latLngNodes.branchPhone,latLngNodes.branchFax]).then(function(res) {
							alert("Insert successfully !");
							//console.log("INSERT ID -> " + res.insertId);
						}, function (err) {
						 alert("Failure");
							
						});	
												
					});   
						
					//alert($rootScope.responseArr.toString);
				}).error(function(data, status, headers, config) {
					 $ionicLoading.hide();
					$ionicPopup.alert({
						title:'Unable to perform your request. Please Check your Device Internet Connection',
										  //template:'From date'
					})
			});            
		}
		
 

 $scope.select1 = function() {
	 
        var query = "SELECT * FROM branch_info";
		 $scope.results = []; 
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {			
				for(var i=0; i<res.rows.length; i++){
					
				//$scope.branch_code_values=	res.rows.item(i).branch_code;				
				 $scope.results.push(res.rows.items(i));
				} 
				
            } else {
             
				alert("No results found");
            }
        }, function (err) {
           // console.error(err);
			 alert("Error Method");
        });
    }
	
	

	
	 $timeout(function() {
     $ionicLoading.hide();
   }, 2000);

  
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
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS branch_info (branch_code text, branch_name text,branch_address text, branch_phone text,branch_fax text)");
        });
    });