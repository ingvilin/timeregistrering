var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TimeregistreringSchema   = new Schema({
    name: String,
    fag: String,
    klasse: String,
    oppmott: Boolean
});

module.exports = mongoose.model('Timeregistrering', TimeregistreringSchema);