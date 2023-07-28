const jwt = require("jsonwebtoken");
const db = require("../models");

const Admin = db.admin;

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ msg: "Authentication Invalid" });
  }
  const token = authHeader.split(" ")[1];
  await jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) return res.status(401).json({ msg: "Access denied! Unauthorized Admin" });
    await Admin.findOne({
      where: { id: decodedToken.id },
    }).then(() => {
      req.admin = decodedToken;
      next();
    });
  });
};

module.exports = authentication;
