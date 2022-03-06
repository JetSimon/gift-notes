var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    content: {type: String, required: true, min:2, max: 40000},
    author: String,
    created: Date,
    openAt: Date,
});

module.exports = mongoose.model('Note', NoteSchema);