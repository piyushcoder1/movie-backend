const Review = require('../models/reviewModel');

exports.rateAndReviewMovie = async (req, res) => {
  try {
    const { rating, text } = req.body;

    const review = new Review({
      movie: req.params.id,
      user: req.user.id,
      rating,
      text
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { rating, text } = req.body;

    const updatedReview = await Review.findOneAndUpdate(
      { _id: req.params.reviewId, user: req.user.id },
      { rating, text },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    res.json(updatedReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findOneAndDelete({
      _id: req.params.reviewId,
      user: req.user.id
    });

    if (!deletedReview) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    res.json({ msg: 'Review deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.listReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.id }).populate('user', 'username');

    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
