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
app.get(['/movies', '/movie'], function (req, res) {
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

// listen (start app with node server.js) ======================================
app.listen(8081);
console.log("App listening on port 8081");
