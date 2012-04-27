
var MD5 = require('MD5');

var setKey = function(e){
	return MD5(e).substring(0, 5);
}

var ClientSchema = new _schema({
	key: {type: String, set: setKey}
});

ClientSchema.statics.validate_consumerKey = function(consumerKey, cb){
	if(consumerKey){
		_mongoose.models.Client
			.where('key', consumerKey)
		.findOne(cb);
	}
}

_mongoose.model('Client', ClientSchema);