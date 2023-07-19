const db = require("../models");

const Review = db.reviews;

const addReview = async (req, res) => {
  const { rating, description } = req.body;
  const review = await Review.create({ rating, description });
  res.status(201).json({ review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.findAll({});
  res.status(200).json({ reviews });
};

module.exports = {
  addReview,
  getAllReviews,
};
