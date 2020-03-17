const mongoose = require('mongoose');

const FilmSchema = mongoose.Schema({
    title:  String,
    year:  Number,
    format: String,
    stars: String,

});

module.exports = mongoose.model('Film', FilmSchema);
