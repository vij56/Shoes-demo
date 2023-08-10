const router = require("express").Router();
const adminController = require("../controllers/adminController.js");
const upload = require("../middleware/upload.js");
const authentication = require("../middleware/jwtAth.js");

router.post("/signup", adminController.signUp);
router.post("/login", adminController.login);
// router.post("/dummy", authentication, adminController.dummy);
router.post(
  "/product",
  authentication,
  upload.array("files[]", 123),
  adminController.addProduct
);
router.get("/products", authentication, adminController.getAllProducts);
router.get("/product/:id", authentication, adminController.getSingleProduct);
router.patch(
  "/product/:id",
  authentication,
  upload.array("files[]", 123),
  adminController.updateProduct
);
router.post("/deleteProduct", authentication, adminController.deleteProduct);
router.post("/deleteOrder", authentication, adminController.deleteOrder);
router.post(
  "/file/upload",
  authentication,
  upload.single("file"),
  adminController.uploadFile
);
// router.patch("/file/upload", upload.single("file"), adminController.updateFile);
router.post("/contents", authentication, adminController.createAllContents);
router.get("/contents", authentication, adminController.retrieveAllContents);
router.patch(
  "/contents/:id",
  authentication,
  adminController.updateAllContents
);

module.exports = router;
