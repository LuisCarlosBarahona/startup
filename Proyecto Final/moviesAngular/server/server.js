var express  = require('express');
var app      = express();                               // create our app w/ express


var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var fs = require("fs");
// configuration =================



app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.get(['/movies', '/movie','/altaPelicula'], function (req, res) {
   res.sendfile(__dirname + '/public/index.html');
});
app.get('/listMovies', function (req, res) { //server service who sends the static file (json/movies.json) with the path '/listMovies'
   fs.readFile( __dirname + "/" + "json/movies.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
});

app.get('/listMovies/:id', function (req, res) {
   // First read existing movies.
   fs.readFile( __dirname + "/" + "json/movies.json", 'utf8', function (err, data) {
        movies = JSON.parse( data );
        
		
		var movieById = [];
	
		for(var i=0; i<movies.length;i++){
			if (movies[i].id===parseInt(req.params.id)){
				movieById.push(movies[i]);
			}
		}
	    res.end( JSON.stringify(movieById));
   });
});
app.get ('/generos', function (req, res){

  fs.readFile( __dirname + "/" + "json/movies.json", 'utf8', function (err, data) {
        movies = JSON.parse( data );

        var moviesGenre=[];
        for(var i=0; i<movies.length;i++){
          var genres =movies[i].genre.split(',');
          for (var j=0; j<genres.length; j++){
            if(moviesGenre.indexOf(genres[j].trim())==-1){
              moviesGenre.push(genres[j].trim());
            }
          };
      };
      res.end(JSON.stringify(moviesGenre));
  });
});

app.get ('/popular', function (req, res){

  fs.readFile( __dirname + "/" + "json/movies.json", 'utf8', function (err, data) {
        movies = JSON.parse( data );

        var copyMovies = movies;
        copyMovies.sort(function(movie1,movie2){
        var rating1 = (movie1.rating);
        var rating2 = (movie2.rating);

        if (rating2<rating1){
          return -1;
          } else if(rating2>rating1){
          return 1;
          }else{
          return 0;
        }
      });
      
        copyMovies= copyMovies.filter(function(movie){
        return movie.rating>=4.0;
      });
      res.end(JSON.stringify(copyMovies));
  });
});

app.get ('/recent', function (req, res){

  fs.readFile( __dirname + "/" + "json/movies.json", 'utf8', function (err, data) {
        movies = JSON.parse( data );

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
      res.end(JSON.stringify(copyMovies));
  });
});


app.get ('/movieSearch', function (req, res){
  
  var userValue = req.query.q;
  console.log(req.query.q);
  fs.readFile( __dirname + "/" + "json/movies.json", 'utf8', function (err, data) {
    movies = JSON.parse( data );
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
    res.end(JSON.stringify(match));
  });
});

app.get ('/selectedGenre', function(req, res){

  var genSelected = req.query.q; //req.query.q returns the q parameter of an URL
  console.log(req.query.q);
  fs.readFile( __dirname + "/" + "json/movies.json", 'utf8', function (err, data) {
    movies = JSON.parse( data );
    var match = [];
         for (i=0; i<movies.length;i++){
           if (movies[i].genre.indexOf(genSelected)!=-1){
              match.push(movies[i]);
           }
        }   
  res.end(JSON.stringify(match));
  });
});

app.post('/savePelicula', function(req, res){
    console.log(req.body);
    res.send("test");
     //server service who sends the static file (json/movies.json) with the path '/listMovies'
    var overwrite;
    fs.readFile( __dirname + "/" + "json/movies.json", 'utf8', function (err, data) {
      
        overwrite = JSON.parse( data );
        overwrite.push(req.body);

        fs.writeFile( __dirname + "/" + "json/movies.json", JSON.stringify(overwrite) , function(err) { //write method inside read method because overwrite a file is  synchronous
          if(err) {
              return console.log(err);
          }

          console.log("The file was saved!");
        });
   });
  res.end();  
});
 
// listen (start app with node server.js) ======================================
app.listen(8081);
console.log("App listening on port 8081");
