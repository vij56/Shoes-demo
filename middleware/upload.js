const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".webp");
  },
});

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype.includes("csv") ||
//     file.mimetype.includes("jpeg") ||
//     file.mimetype.includes("png")
//   ) {
//     cb(null, true);
//   } else {
//     cb("Please upload valid file.", false);
//   }
// };

const uploadFile = multer({
  storage: storage,
  // fileFilter: fileFilter,
});

module.exports = uploadFile;
