const router = require("express").Router();

const orderControllers = require("../controllers/orderController");

router.post("/checkout", orderControllers.createOrder);
router.get("/checkout/:id", orderControllers.retrieveOrder);
router.get("/checkout", orderControllers.getCartFromOrder);

module.exports = router;
