const router = require("express").Router();

const attributesControllers = require("../controllers/attributesController");

router.post("/attribute", attributesControllers.createAttributes);
router.get("/attributes", attributesControllers.getAttributes);
router.delete("/attribute/:id", attributesControllers.deleteAttribute);

module.exports = router;
