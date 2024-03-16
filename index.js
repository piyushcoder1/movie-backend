require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

const usersRouter = require('./routes/authRoutes');
const moviesRouter = require('./routes/movieRoutes');
const reviewsRouter = require('./routes/reviewRoutes');

app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/reviews', reviewsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
