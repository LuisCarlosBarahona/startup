movieApp.controller('estrenosCtrl', function mainCtrl($scope, $http) {
		
		var movies = null;

		//client side

		$scope.searchText = null;
		    	
    	$scope.todas = function(){
    		$http.get('/listMovies').success(function(data){
			$scope.movies = data;
			movies = data;
			}); 
    	}
    	$scope.todas();

    	$scope.popular=function(){

			$http.get('/popular').success(function(data){
			$scope.movies = data;
			});
    	};
    	
    	$scope.recent=function(){
    		//var currentYear = new Date();
    		$http.get('/recent').success(function(data){
			$scope.movies = data;
			});
    	};

    	$scope.search=function(keyEvent){

    		if (keyEvent.which === 13){
    			var userValue =$scope.searchText;
    			$http.get('/movieSearch',
    					{ params:  
    						{ 'q': userValue} //This is how to send the value of the input text as a q parameter
    				})
    				.success (function(data){
    					$scope.movies = data;
    				});
    		}
     	};

     	$scope.$watch('genreSelected', function(value){
     		if ($scope.genreSelected!= null){
     			$http.get('/selectedGenre',
    					{ params:  
    						{ 'q': value} //This is how to send the value of the input text as a q parameter
    				})
    				.success (function(data){
    					$scope.movies = data;
    				});
    			}
    		});
    	$scope.getGenres=function(){
    		$http.get('/generos').success(function(data){
			$scope.genres = data;
			});
		};
		$scope.getGenres();
});