const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    function removeCharsUntil(inputString, specifiedCharacter) {
      while (
        inputString.length > 0 &&
        inputString.charAt(inputString.length - 1) !== specifiedCharacter
      ) {
        inputString = inputString.slice(0, -1);
      }
      return inputString;
    }
    const result = removeCharsUntil(file.originalname, ".");
    cb(null, Date.now() + result + ".webp");
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("png") ||
    file.mimetype.includes("webp")
  ) {
    cb(null, true);
  } else {
    cb("Please upload JPG, JPEG, or PNG file", false);
  }
};

const uploadFile = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = uploadFile;
