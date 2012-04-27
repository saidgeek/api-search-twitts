
var clients = require('./client.js');

var TagSchema = new _schema({
	value: {type: String, trim: true},
	check: {type: Boolean, default: 0}
});

TagSchema.statics.tag_by_value = function(value, cb){
	if(value){
		_mongoose.models.Tag
			.where('value', value)
		.findOne(cb);
	}
}

_mongoose.model('Tag', TagSchema);