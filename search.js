var Worker = require('dnode-worker');

Worker({
  add: function () {
  	var search = require('twitter-search');
 //  	_mongoose = require('mongoose');
	// _schema = _mongoose.Schema;
	// _mongoose.connect('mongodb://userast:ast772689@ds033037.mongolab.com:33037/api-search-twitts');

	// var TagSchema = new _schema({
	// 	value: {type: String},
	// 	check: {type: Boolean}
	// });
	// var TwittsSchema = new _schema({
	// 	id_str: {type: String, unique: true},
	// 	created_at: {type: Date},
	// 	from_user: {type: String},
	// 	from_user_name: {type: String},
	// 	profile_image_url: {type: String},
	// 	source: {type: String},
	// 	text: {type: String},
	// 	tag_id: {type: String}
	// });
	// _mongoose.model('Tag', TagSchema);
	// _mongoose.model('Twitts', TwittsSchema);

 //  	console.log("inicio worker");
	// setInterval(function(){
	// 	_mongoose.models.Tag.findOne({'check': 0}, function(err, tag){
	// 		if(err){
	// 			console.log(err);
	// 		}else{
	// 			if(tag){
	// 				console.log(tag);
	// 				search({ query: tag.value }, function(err, twitts, twittsCount){
	// 					if(err){
	// 						console.log(err);
	// 					}else{
	// 						console.log(tag.value + ": " + twittsCount);
	// 						var tag_id = tag._id;
	// 						for(var t in twitts){
	// 							//console.log(twitts[t]);
	// 							var _twit = new _mongoose.models.Twitts();
	// 							_twit.set('id_str', twitts[t].id_str);
	// 							_twit.set('created_at', new Date(twitts[t].created_at));
	// 							_twit.set('from_user', twitts[t].from_user);
	// 							_twit.set('from_user_name', twitts[t].from_user_name);
	// 							_twit.set('profile_image_url', twitts[t].profile_image_url);
	// 							_twit.set('source', twitts[t].source);
	// 							_twit.set('text', twitts[t].text);
	// 							_twit.set('tag_id', tag_id);
	// 							_twit.save(function(err){
	// 								if(err){
	// 								}else{
	// 								}
	// 							});
	// 						}
	// 					}
	// 					_mongoose.models.Tag.update({'_id': tag._id}, { check: 1}, function(err, t){
	// 						if(err){
	// 							console.log(err);
	// 						}else{
	// 							console.log('update ok - ' + t);
	// 						}
	// 					});
	// 				});
	// 			}else{
	// 				_mongoose.models.Tag.find({ 'check': 1 }, function(err, t){
	// 					if(err){
	// 						console.log(err);
	// 					}else{
	// 						for(var i in t){
	// 							_mongoose.models.Tag.update({'_id': t[i]._id}, { check: 0}, function(err, t){
	// 								if(err){
	// 									console.log(err);
	// 								}else{
	// 									console.log('update ok - ' + t);
	// 								}
	// 							});
	// 						}
	// 					}
	// 				});
	// 			}
	// 		}
			
	// 	});
	// }, 60000); // 1800000
  }
}, function (worker, exit) {
  worker.add();
});


