// Variables globales de MongoDB
GLOBAL._mongoose = require('mongoose');
GLOBAL._schema = _mongoose.Schema;
GLOBAL._objejctid = _schema.ObjectId;

// Cadena de conexion a base de datos
var conURL = 'mongodb://localhost/search_twitts';

// Schemas
require('./tags.js');
require('./twitts.js');
require('./client.js');


app.models = _mongoose.models;
_mongoose.connect(conURL);
module.exports = _mongoose.models;