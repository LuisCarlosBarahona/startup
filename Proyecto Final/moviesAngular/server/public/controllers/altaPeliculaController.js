movieApp.controller('altaPeliculaCtrl', function mainCtrl($scope, $http) {

	$scope.newMovie={};
	$scope.addMovie =function(){
		console.log($scope.newMovie);
		$http.post('/savePelicula',$scope.newMovie)
      	};

    $scope.getGenres=function(){
		$http.get('/generos').success(function(data){
		$scope.genres = data;
		});
	};
	$scope.getGenres();

});