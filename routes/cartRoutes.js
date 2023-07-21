const router = require("express").Router();
const cartController = require("../controllers/cartController.js");

router.post("/cart", cartController.createCart);
router.get("/cart/:userId", cartController.getAllProductsFromCart);
router.get("/cart/:id", cartController.getCart);
router.patch("/cartItem", cartController.updateCart);
router.delete("/cart/:id", cartController.clearCart);

module.exports = router;
