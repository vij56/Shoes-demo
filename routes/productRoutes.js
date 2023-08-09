const router = require("express").Router();
const productController = require("../controllers/productController.js");

router.get("/", productController.getAllProducts);
router.get("/related", productController.getRelatedProducts);
router.post("/product-category/men-footwear", productController.getProducts);
router.post("/product", productController.getSingleProduct);
router.post(
  "/product-category/men-footwear/sort/:category",
  productController.shortProducts
);
router.post("/search", productController.searchProductByKeyword);
router.get("/contents", productController.retrieveAllContents);

module.exports = router;
