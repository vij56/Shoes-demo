const router = require("express").Router();
const adminController = require("../controllers/adminController.js");
const upload = require("../middleware/upload.js");
const authentication = require("../middleware/jwtAth.js");

router.post("/signup", adminController.signUp);
router.post("/login", adminController.login);
router.post("/dummy", authentication, adminController.dummy);
router.post("/product", adminController.addProduct);
router.post("/products", adminController.getAllProducts);
router.get("/product/:id", adminController.getSingleProduct);
router.patch("/product/:id", adminController.updateProduct);
router.delete("/product/:id", adminController.deleteProduct);
router.post("/file/upload", upload.single("file"), adminController.uploadFile);
// router.patch("/file/upload", upload.single("file"), adminController.updateFile);
// router.post(
//   "/file/multiple/upload",
//   upload.array("files", 99),
//   adminController.uploadMultipleFiles
// );
router.get("/file/download", adminController.downloadFile);

module.exports = router;
