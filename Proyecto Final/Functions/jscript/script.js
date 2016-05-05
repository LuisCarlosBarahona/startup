var aMovie = [
   {
      "id": 1,
      "title": "Funny People",
      "year": "2009",
      "released": "2009-04-29T00:00:00.0Z",
      "genre": "Comedy, Drama",
      "director": 1,
      "actors": [
         1,
         6
      ],
      "plot": "When seasoned comedian George Simmons learns of his terminal, inoperable health condition, his desire to form a genuine friendship causes him to take a relatively green performer under his wing as his opening act.",
      "poster": "http://ia.media-imdb.com/images/M/MV5BMTMxNDQ5MTA5MF5BMl5BanBnXkFtZTcwMzUyMDUwMg@@._V1_SX300.jpg",
	  "rating": 2.0
   },
   {
      "id": 2,
      "title": "The Hangover Part II",
      "year": "2011",
      "released": "2011-05-26T00:00:00.0Z",
      "genre": "Comedy",
      "director": 2,
      "actors": [
         2,
         7
      ],
      "plot": "Right after the bachelor party in Las Vegas, Phil, Stu, Alan, and Doug jet to Thailand for Stu's wedding. Stu's plan for a subdued pre-wedding brunch, however, goes seriously awry.",
      "poster": "http://ia.media-imdb.com/images/M/MV5BMTM2MTM4MzY2OV5BMl5BanBnXkFtZTcwNjQ3NzI4NA@@._V1_SX320.jpg",
	  "rating": 3.5
   },
   {
      "id": 3,
      "title": "Fight Club",
      "year": "1999",
      "released": "1987-10-15T00:00:00.0Z",
      "genre": "Drama",
      "director": 3,
      "actors": [
         3,
         8
      ],
      "plot": "An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soap maker, forming an underground fight club that evolves into something much, much more...",
      "poster": "http://ia.media-imdb.com/images/M/MV5BMjIwNTYzMzE1M15BMl5BanBnXkFtZTcwOTE5Mzg3OA@@._V1_SX300.jpg",
	  "rating": 4.5
   },
   {
      "id": 4,
      "title": "Toy Story",
      "year": "1995",
      "released": "1995-01-22T00:00:00.0Z",
      "genre": "Animation, Adventure, Comedy",
      "director": 4,
      "actors": [
         4,
         9
      ],
      "plot": "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
      "poster": "http://ia.media-imdb.com/images/M/MV5BMTgwMjI4MzU5N15BMl5BanBnXkFtZTcwMTMyNTk3OA@@._V1_SX300.jpg",
	  "rating": 4.2
   },
   {
      "id": 5,
      "title": "Forrest Gump",
      "year": "1994",
      "released": "1994-07-06T00:00:00.0Z",
      "genre": "Drama, Romance",
      "director": 5,
      "actors": [
         4,
         10
      ],
      "plot": "Forrest Gump, while not intelligent, has accidentally been present at many historic moments, but his true love, Jenny Curran, eludes him.",
      "poster": "http://ia.media-imdb.com/images/M/MV5BMTI1Nzk1MzQwMV5BMl5BanBnXkFtZTYwODkxOTA5._V1_SX300.jpg",
	  "rating": 4.3
   }
];
 var aDirectors= [
   {
      "id": 1,
      "name": "Judd Apatow"
   },
   {
      "id": 2,
      "name": "Todd Phillips"
   },
   {
      "id": 3,
      "name": "David Fincher"
   },
   {
      "id": 4,
      "name": "John Lasseter"
   },
   {
      "id": 5,
      "name": "Robert Zemeckis"
   }
];
 var anActor = [{
	"id": 1,
	"name": "Adam Sandler"
},{
	"id": 2,
	"name": "Bradley Cooper"
},{
	"id": 3,
	"name": "Edward Norton"
},{
	"id": 4,
	"name": "Tom Hanks"
},{
	"id": 4,
	"name": "Tom Hanks"
}];
var anotherActor = [{
	"id": 6,
	"name": "Seth Rogen"
},{
	"id": 7,
	"name": "Zach Galifianakis"
},{
	"id": 8,
	"name": "Brad Pitt"
},{
	"id": 9,
	"name": "Tim Allen"
},{
	"id": 10,
	"name": "Rebecca Williams"
}];

var data = [{
	"movies": [aMovie],
	"actors": [anActor,anotherActor],
	"directors": [aDirectors]
}];

var getOrderedMoviesByReleased = function (){
	
		var currentYear = new Date();
		var copyArray = data[0].movies[0].slice(0); //Create a clone of the original array to manipulate.


		copyArray.sort(function(movie1,movie2){
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

		return copyArray;
};

//console.log(getOrderedMoviesByReleased());
//console.log(data[0].movies[0]); It shows the original array, it can be compared in console with the ordered array 

var getPopularMovies = function (){
	
		var copyArray = data[0].movies[0]; //Create a new reference of the original array to manipulate. (IT'S NOT A COPY!)

		copyArray = copyArray.filter(function(movie){
			/*if (movie.rating>=4.0){ This is what return movies does, 4 lines it can be reduced in just one below.
				return true;
			} else{
				return false;
			}*/
		return movie.rating>=4.0;
		});
	return copyArray;	
};
			
//console.log(getPopularMovies());

var getAllMovies = function(){
	return data[0].movies[0];
};

var getGenreMovies= function(){

	var copyArray = data[0].movies[0];
	var genresMovies= []; //An array with all genres
	$.each(copyArray,function(index, movie){
		var genresMovie = movie.genre.split(",");
		for(var i=0; i<genresMovie.length;i++){
			var genreMovie=genresMovie[i].trim(); // Iterate the genres of a movie. (Just one movie!)
			if (genresMovies.indexOf(genreMovie)===-1){ //Search if a single genre is on
				genresMovies.push(genreMovie); // Put a genreMovie into the final array
			}
		}
	});
	return genresMovies;
};
console.log(getGenreMovies());



