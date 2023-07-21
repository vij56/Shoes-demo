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
    product,
    total,
    toc,
    userId,
    cartId,
  } = req.body;
  if (toc) {
    for (id of cartId) {
      await Cart.destroy({ where: { id: id } });
    }
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
      product,
      total,
      toc,
      userId,
    });
    return res.status(201).json(order);
  }
};

const getCartFromOrder = async (req, res) => {
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
  const { id } = req.params;
  const order = await Order.findOne({
    where: { id: id },
  });
  res.status(200).json({ order });
};

module.exports = {
  createOrder,
  retrieveOrder,
  getCartFromOrder,
};
