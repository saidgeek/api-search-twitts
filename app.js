
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

app.config = JSON.parse(require('fs').readFileSync('./config.json', 'utf8'));
app.config.time = "13300"

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

require('./models/main.js');
require('./routes/main.js');

require('./search.js')

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
