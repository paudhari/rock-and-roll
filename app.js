var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var dbConnection = require('./src/db/dbConnection');
var artist = require('./src/controller/artistsController');
var category = require('./src/controller/categoryController');
var app = express();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.options("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type,Authorization, Accept,Client-Security-Token,X-Access-Token,X-Key, Accept-Encoding, Key');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

    res.header('Access-Control-Allow-Origin', '*');
    //other headers here
    res.status(200).end();
    //next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.send({ status: 200, message: 'OK' });
    res.end();
});

app.post('/api/artists', artist.createArtist);
/**
 * Request Method-
    POST
 * Request Url -
    http://localhost:3000/api/artists/
 * Payload data
  {
   "name": "Justin",
   "imageURL": "http://bdfjade.com/data/out/144/6470619-justin-bieber-images.jpg"
     "songs":["All Around The World", "All I Want Is You", "All That Matters"]
  }
 * Success Response
    {
     message: 'Artist crated successfully',
     data: 'OK'
    }
 */


app.get('/api/songs', artist.index);
/**
 * Description-
    To get the list of songs for an artist
 * Request Method-
    GET
 * Request Url -
    http://localhost:3000/api/song?name=Justin
 * Success Response
    {
    "songs": [
       "All Around The World",
       "All I Want Is You",
       "All That Matters"
      ]
    }
 *
 */

app.get('/api/categories', category.index);
/**
 * Description-
    To get the all the category 
 * Request Method-
    GET
 * Request Url -
    http://localhost:3000/api/categories
 * Success Response
    { 
      category :[
        "Pop",
        "Rock"
      ]
    }
 */
app.get('/api/artists', artist.index);
/**
 * Description-
    To get the all the artist Data
 * Request Method-
    GET
 * Request Url -
    http://localhost:3000/api/artists
 * Success Response
    {
    "artist":
      [
       {
         "name": "Justin"
       },
       {
         "name": "Rihanna"
       },
       {
         "name": "Pink"
       }
      ]
    }
 */
app.get('/api/artists?category=Pop', artist.index);
/**
 * Description-
    To get the all the artist Data on to the basis of category
 * Request Method-
    GET
 * Request Url -
    http://localhost:3000/api/artists
 * Success Response
    {
    artist:[
       {
         "name": "Justin"
       }
      ]
    }
 */
// Add headers
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;



///Search 541-

186060909