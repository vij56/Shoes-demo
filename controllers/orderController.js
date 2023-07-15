const { Sequelize } = require("sequelize");
const db = require("../models"); // finds index.js file by default, no need to define

// create main model
const Order = db.order;

const createOrder = async (req, res) => {
  const {
    firstName,
    lastName,
    companyName,
    streetAddress,
    city,
    state,
    pinCode,
    phoneNumber,
    emailAddress,
    notes,
    productId,
  } = req.body;
  const order = await Order.create({
    firstName,
    lastName,
    companyName,
    streetAddress,
    city,
    state,
    pinCode,
    phoneNumber,
    emailAddress,
    notes,
    productId,
  });
  res.status(201).json({ order });
};

const retrieveOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({ where: { id: id } });
  res.status(200).json({ order });
};

module.exports = {
  createOrder,
  retrieveOrder,
};
