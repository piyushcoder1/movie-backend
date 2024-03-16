const Movie = require('../models/movieModel');

exports.addMovie = async (req, res) => {
  try {
    const { title, director, genre, releaseYear, description } = req.body;

    const movie = new Movie({
      title,
      director,
      genre,
      releaseYear,
      description
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const { title, director, genre, releaseYear, description } = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
      title,
      director,
      genre,
      releaseYear,
      description
    }, { new: true });

    if (!updatedMovie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    res.json(updatedMovie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    await movie.remove();
    res.json({ msg: 'Movie removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getMovieDetails = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.listMovies = async (req, res) => {
  try {
    const { genre, releaseYear, director } = req.query;
    let query = {};

    if (genre) query.genre = genre;
    if (releaseYear) query.releaseYear = releaseYear;
    if (director) query.director = director;

    const movies = await Movie.find(query);

    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
