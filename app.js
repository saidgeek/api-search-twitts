
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  ,sys = require('sys');

GLOBAL.app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

require('./models/main.js');
require('./routes/main.js');

require('./search.js')

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});