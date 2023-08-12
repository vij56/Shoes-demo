const router = require("express").Router();
const adminController = require("../controllers/adminController.js");
const uploadImages = require("../middleware/uploadImages.js");
const uploadCSV = require("../middleware/uploadCSV.js");
const authentication = require("../middleware/jwtAth.js");

router.post("/signup", adminController.signUp);
router.post("/login", adminController.login);
router.post(
  "/product",
  authentication,
  uploadImages.array("files[]", 123),
  adminController.addProduct
);
router.get("/products", authentication, adminController.getAllProducts);
router.get("/product/:id", authentication, adminController.getSingleProduct);
router.patch(
  "/product/:id",
  authentication,
  uploadImages.array("files[]", 123),
  adminController.updateProduct
);
router.post("/deleteProduct", authentication, adminController.deleteProduct);
router.post("/deleteOrder", authentication, adminController.deleteOrder);
router.post(
  "/file/upload",
  authentication,
  uploadCSV.single("file"),
  adminController.uploadFile
);
router.post("/contents", authentication, adminController.createAllContents);
router.get("/contents", authentication, adminController.retrieveAllContents);
router.patch(
  "/contents/:id",
  authentication,
  adminController.updateAllContents
);

module.exports = router;
