const router = require("express").Router();
const reviewController = require("../controllers/reviewController.js");
const productController = require("../controllers/productController.js");

router.post("/", reviewController.addReview);
router.get("/", reviewController.getAllReviews);
router.post("/product-review", productController.getProductReviews);

module.exports = router;
