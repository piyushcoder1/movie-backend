const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movieController');

router.post('/', moviesController.addMovie);


router.put('/:id', moviesController.updateMovie);


router.delete('/:id', moviesController.deleteMovie);


router.get('/:id', moviesController.getMovieDetails);

router.get('/', moviesController.listMovies);

module.exports = router;
