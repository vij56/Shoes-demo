const router = require("express").Router();
const adminController = require("../controllers/adminController.js");
const upload = require("../middleware/upload.js");

router.post("/admin/product", adminController.addProduct);
router.get("/admin/product", adminController.getAllProducts);
router.get("/admin/product/:id", adminController.getSingleProduct);
router.patch("/admin/product/:id", adminController.updateProduct);
router.delete("/admin/product/:id", adminController.deleteProduct);
router.post("/file/upload", upload.single("file"), adminController.uploadFile);
// router.post(
//   "/file/multiple/upload",
//   upload.array("files", 99),
//   adminController.uploadMultipleFiles
// );
// router.get("/file", adminController.downloadFile);

module.exports = router;
