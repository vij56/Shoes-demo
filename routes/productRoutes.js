const router = require("express").Router();
const productController = require("../controllers/productController.js");

router.post("/add-product", productController.addProduct);
router.get("/", productController.getAllProducts);
router.post("/product-category/men-footwear", productController.getProducts);
router.get("/product/:id", productController.getSingleProduct);
router.post(
  "/product-category/men-footwear/sort",
  productController.shortProducts
);

module.exports = router;
