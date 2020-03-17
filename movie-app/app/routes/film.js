module.exports = (app) => {
    const films = require('../controllers/film.js');

    // Create a new Note
    app.post('/films', films.create);

    // Retrieve all Notes
    app.get('/films', films.findAll);

    // Retrieve a single Note with filmId
    app.get('/films/:filmId', films.findOne);

    // Update a Note with filmId
    app.put('/films/:filmId', films.update);

    // Delete a Note with filmId
    app.delete('/films/:filmId', films.delete);
}
