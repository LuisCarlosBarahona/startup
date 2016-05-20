movieApp.controller('fichaPeliculaCtrl', function mainCtrl($scope, $http) {
	var parseQueryString = function() {

        var str = window.location.search;
        var objURL = {};

        str.replace(
            new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
            function( $0, $1, $2, $3 ){
            objURL[ $1 ] = $3;
            }
        );
        return objURL;
    };

    var params= parseQueryString();
    var id = parseInt(params.id);
    $http.get('/listMovies/'+ id).success(function(data){
    	var movie = data[0];
    	$scope.movie = movie;
    });

         

});