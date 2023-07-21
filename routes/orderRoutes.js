const router = require("express").Router();

const orderControllers = require("../controllers/orderController");

router.post("/order", orderControllers.createOrder);
router.get("/order/:id", orderControllers.retrieveOrder);
router.get("/checkout", orderControllers.getCartFromOrder);

module.exports = router;
