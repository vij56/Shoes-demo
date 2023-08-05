const router = require("express").Router();
const settingsController = require("../controllers/settingsController.js");

router.post("/settings", settingsController.createSettings);
router.get("/settings", settingsController.getSettings);
router.patch("/settings/:id", settingsController.updateSettings);

module.exports = router;
