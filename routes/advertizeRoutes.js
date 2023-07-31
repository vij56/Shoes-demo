const router = require("express").Router();
const advertizeController = require("../controllers/advertizeController.js");

router.post("/advertize", advertizeController.createAdvertize);
router.get("/advertize/:id", advertizeController.getSingleAdvertize);
router.get("/advertizes", advertizeController.getAllAdvertize);
router.patch("/advertize/:id", advertizeController.updateAdvertize);

module.exports = router;
