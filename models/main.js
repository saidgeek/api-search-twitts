// Variables globales de MongoDB
GLOBAL._mongoose = require('mongoose');
GLOBAL._schema = _mongoose.Schema;
GLOBAL._objejctid = _schema.ObjectId;

// Cadena de conexion a base de datos
var conURL = 'mongodb://usertwitt:atx772689@ds033107.mongolab.com:33107/heroku_app4282886';

// Schemas
require('./tags.js');
require('./twitts.js');
require('./client.js');


app.models = _mongoose.models;
_mongoose.connect(conURL);
module.exports = _mongoose.models;