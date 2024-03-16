const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');

router.post('/:id', auth, reviewsController.rateAndReviewMovie);

router.put('/:movieId/:reviewId', auth, reviewsController.updateReview);

router.delete('/:movieId/:reviewId', auth, reviewsController.deleteReview);

router.get('/:id', reviewsController.listReviews);

module.exports = router;
