var tags = require('./tags.js');

var TwittsSchema = new _schema({
	id_str: {type: String, unique: true},
	create_at: {type: Date},
	from_user: {type: String},
	from_user_name: {type: String},
	profile_image_url: {type: String},
	source: {type: String},
	text: {type: String},
	tag_id: {type: String}
});

_mongoose.model('Twitts', TwittsSchema);