const router = require("express").Router();

const categroyControllers = require("../controllers/categoryController");

router.post("/category", categroyControllers.createCategory);
router.get("/categorys", categroyControllers.getCategorys);
router.delete("/category/:id", categroyControllers.deleteCategory);

module.exports = router;
