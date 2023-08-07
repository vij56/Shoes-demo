const router = require("express").Router();

const orderControllers = require("../controllers/orderController");

router.post("/order", orderControllers.createOrder);
router.get("/orders", orderControllers.retrieveAllOrders);
router.get("/order/:id", orderControllers.retrieveOrder);
router.get("/checkout", orderControllers.getCartFromOrder);
router.get("/orders/:userId", orderControllers.getUserOrder);
router.post("/product/tracking", orderControllers.trackOrder);

module.exports = router;
