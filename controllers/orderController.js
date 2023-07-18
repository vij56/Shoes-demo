const { Sequelize } = require("sequelize");
const db = require("../models"); // finds index.js file by default, no need to define

// create main model
const Order = db.order;
const Cart = db.cart;
const Product = db.products;

const createOrder = async (req, res) => {
  const {
    // firstName,
    // lastName,
    // companyName,
    // streetAddress,
    // city,
    // state,
    // pinCode,
    // phoneNumber,
    // emailAddress,
    // notes,
    productId,
    cartId,
  } = req.body;
  const order = await Order.create({
    // firstName,
    // lastName,
    // companyName,
    // streetAddress,
    // city,
    // state,
    // pinCode,
    // phoneNumber,
    // emailAddress,
    // notes,
    productId,
    cartId,
  });
  res.status(201).json({ order });
};

const retrieveOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findOne({
    include: [
      {
        model: Product,
        attributes: ["title", "price"],
        include: [
          {
            model: Cart,
            attributes: ["size", "quantity"],
          },
        ],
      },
    ],
    where: { id: id },
  });
  res.status(200).json({ order });
};

module.exports = {
  createOrder,
  retrieveOrder,
};
