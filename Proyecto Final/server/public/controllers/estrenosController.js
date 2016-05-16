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

    		var copyMovies = movies;
    		copyMovies.sort(function(movie1,movie2){
			var rating1 = new Date(movie1.rating);
			var rating2 = new Date(movie2.rating);

			if (rating2<rating1){
				return -1;
			} else if(rating2>rating1){
				return 1;
			}else{
				return 0;
			}
			});
    	
    		$scope.movies = copyMovies;
    	 	$scope.movies = $scope.movies.filter(function(movie){
				return movie.rating>=4.0;
			});
    	};

    	$scope.recent=function(){
    		var currentYear = new Date();
    		var copyMovies = movies;
    		copyMovies.sort(function(movie1,movie2){
			var releasedDate1 = new Date(movie1.released);
			var releasedDate2 = new Date(movie2.released);

			if (releasedDate2<releasedDate1){
				return -1;
			} else if(releasedDate2>releasedDate1){
				return 1;
			}else{
				return 0;
			}
		});
    			$scope.movies = copyMovies;
    	};

    	$scope.search=function(keyEvent){

    		if (keyEvent.which === 13){
    			
				var userValue = $scope.searchText;
	    		var match = [];
	    		for (i=0; i<movies.length;i++){
	    			if (movies[i].title.toLowerCase().indexOf(userValue.toLowerCase())!=-1){
	    				 match.push(movies[i]);
	    			}
	    			if (movies[i].director.toLowerCase().indexOf(userValue.toLowerCase())!=-1){
	    				match.push(movies[i]);
	    			}
	    			if (movies[i].actors.toLowerCase().indexOf(userValue.toLowerCase())!=-1){
	    				match.push(movies[i]);
	    			}
	    		}
	    		$scope.movies=match;
    		}
    	};

    	$scope.getGenres=function(){
    		var moviesGenre=[];
    		for(i=0; i<movies.length;i++){
    			if(moviesGenre.indexOf(movies[i].genre)!=-1){
    				moviesGenre.push(movies[i].genre);
    			}
    		}
    		moviesGenre;
    		alert(moviesGenre);
		};
});