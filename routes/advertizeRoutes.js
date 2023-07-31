const router = require("express").Router();
const advertizeController = require("../controllers/advertizeController.js");

router.post("/advertize", advertizeController.createAdvertize);
router.get("/advertize/:id", advertizeController.getSingleAdvertize);
router.get("/advertizes", advertizeController.getAllAdvertize);

module.exports = router;
