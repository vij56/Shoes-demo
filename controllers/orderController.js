const { Sequelize } = require("sequelize");
const db = require("../models");

const Order = db.order;
const Cart = db.cart;
const Product = db.products;

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
    cartId,
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
    cartId,
  });
  res.status(201).json({ order });
};

const getCartFromOrder = async (req, res) => {
  const { id } = req.body;
  const cart = await Cart.findAll({
    include: [
      {
        model: Product,
        attributes: ["title", "price"],
      },
    ],
  });
  res.status(200).json({ cart });
};

const retrieveOrder = async (req, res) => {
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
  getCartFromOrder,
};
