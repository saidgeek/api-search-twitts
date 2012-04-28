
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

var search = require('twitter-search');
console.log("inicio worker");
setInterval(function(){
  app.models.Tag.findOne({'check': 0}, function(err, tag){
    if(err){
      console.log(err);
    }else{
      if(tag){
        console.log(tag);
        search({ query: tag.value }, function(err, twitts, twittsCount){
          if(err){
            console.log(err);
          }else{
            console.log(tag.value + ": " + twittsCount);
            var tag_id = tag._id;
            for(var t in twitts){
              //console.log(twitts[t]);
              var _twit = new _mongoose.models.Twitts();
              _twit.set('id_str', twitts[t].id_str);
              _twit.set('created_at', new Date(twitts[t].created_at));
              _twit.set('from_user', twitts[t].from_user);
              _twit.set('from_user_name', twitts[t].from_user_name);
              _twit.set('profile_image_url', twitts[t].profile_image_url);
              _twit.set('source', twitts[t].source);
              _twit.set('text', twitts[t].text);
              _twit.set('tag_id', tag_id);
              _twit.save(function(err){
                if(err){
                }else{
                }
              });
            }
          }
          app.models.Tag.update({'_id': tag._id}, { check: 1}, function(err, t){
            if(err){
              console.log(err);
            }else{
              console.log('update ok - ' + t);
            }
          });
        });
      }else{
        app.models.Tag.find({ 'check': 1 }, function(err, t){
          if(err){
            console.log(err);
          }else{
            for(var i in t){
              app.models.Tag.update({'_id': t[i]._id}, { check: 0}, function(err, t){
                if(err){
                  console.log(err);
                }else{
                  console.log('update ok - ' + t);
                }
              });
            }
          }
        });
      }
    }
    
  });
}, 7200000);
  

app.listen(process.env.PORT || 3000);