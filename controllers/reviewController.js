const Review = require('../models/review');
const ObjectId = require('mongoose').Types.ObjectId;

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('user', '-password');
    res
      .status(200)
      .json({ status: 'success', results: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};
const getOneReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: 'error', error: 'Invalid Review ID' });
    }
    if (!review)
      return res.status(404).json({
        status: 'error',
        error: 'Review with the given ID not found',
      });
    return res.status(200).json({ status: 'success', data: review });
  } catch (error) {
    next(error);
  }
};
const createReview = async (req, res, next) => {
  const { review, ratings, images } = req.body;
  const { _id } = req.user;
  if (!review || !ratings || !images) {
    return res
      .status(400)
      .json({ status: 'error', error: 'All fields required' });
  }
  try {
    let newReview = new Review({
      review,
      ratings,
      user: _id,
      images,
    });
    newReview = await newReview.save();
    res.status(201).json({ status: 'success', data: newReview });
  } catch (error) {
    next(error);
  }
};
const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { review, ratings, images } = req.body;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: 'error', error: 'Invalid Review ID' });
    }
    if (!review || !ratings || !images)
      return res
        .status(400)
        .json({ status: 'error', error: 'All fields required' });
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      {
        review,
        ratings,
        images,
        user: _id,
      },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({
        status: 'error',
        error: 'Review with the given ID not found ',
      });
    }
    res.status(200).json({ status: 'success', data: updatedReview });
  } catch (error) {
    next(error);
  }
};
const deleteReview = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ status: 'error', error: 'Invalid Review ID' });
  }
  try {
    const review = await Review.findByIdAndRemove(id);
    if (!review) {
      return res
        .status(404)
        .json({ status: 'error', error: 'Review with the given ID not found' });
    }
    res
      .status(204)
      .json({ status: 'success', data: 'Review successfully deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllReviews,
  getOneReview,
  createReview,
  updateReview,
  deleteReview,
};
