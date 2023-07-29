const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storedFiles/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

const excelFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv") || file.mimetype.includes("jpeg")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};

const uploadFile = multer({
  storage: storage,
  fileFilter: excelFilter,
});

module.exports = uploadFile;
