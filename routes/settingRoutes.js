const router = require("express").Router();
const settingsController = require("../controllers/settingsController.js");

router.post("/currency", settingsController.createCurrency);
router.get("/currency", settingsController.getCurrency);
router.patch("/currency/:id", settingsController.updateCurrency);

module.exports = router;
