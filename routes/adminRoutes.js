const router = require("express").Router();
const adminController = require("../controllers/adminController.js");

router.post("/admin/product", adminController.addProduct);
router.get("/admin/product", adminController.getAllProducts);
router.get("/admin/product/:id", adminController.getSingleProduct);
router.patch("/admin/product/:id", adminController.updateProduct);
router.delete("/admin/product/:id", adminController.deleteProduct);

module.exports = router;
