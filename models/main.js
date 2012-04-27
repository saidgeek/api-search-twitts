// Variables globales de MongoDB
GLOBAL._mongoose = require('mongoose');
GLOBAL._schema = _mongoose.Schema;
GLOBAL._objejctid = _schema.ObjectId;

// Cadena de conexion a base de datos
var conURL = 'mongodb://userast:ast772689@ds033037.mongolab.com:33037/api-search-twitts';

// Schemas
require('./tags.js');
require('./twitts.js');
require('./client.js');


app.models = _mongoose.models;
_mongoose.connect(conURL);
module.exports = _mongoose.models;