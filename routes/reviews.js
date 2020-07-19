const authController = require('../middleware/auth');
const reviewController = require('../controllers/reviewController');
const express = require('express');
const router = express.Router();

router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getOneReview);
router.post('/', authController.verifyToken, reviewController.createReview);
router.put('/:id', authController.verifyToken, reviewController.updateReview);
router.delete(
  '/:id',
  authController.verifyToken,
  reviewController.deleteReview
);

module.exports = router;
