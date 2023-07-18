const router = require("express").Router();
const cartController = require("../controllers/cartController.js");

router.post("/cart", cartController.createCart);
router.get("/cart", cartController.getAllProductsFromCart);
router.get("/cart/:id", cartController.getCart);
router.patch("/cart/:cartId", cartController.updateCart);
router.delete("/cart/:id", cartController.deleteCart);

module.exports = router;
