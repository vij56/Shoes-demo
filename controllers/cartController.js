const { Sequelize } = require("sequelize");
const db = require("../models"); // finds index.js file by default, no need to define

// create main model
const Cart = db.cart;

const createCart = async (req, res) => {
  const { productId, size, quantity } = req.body;
  const cart = await Cart.create({
    productId,
    size,
    quantity,
  });
  res.status(201).json({ cart });
};

const getCart = async (req, res) => {
  const { id } = req.params;
  const cart = await Cart.findOne({ where: { id: id } });
  res.status(200).json({ cart });
};

const updateCart = async (req, res) => {
  const { id } = req.params;
  const cart = await Cart.update(req.body, {
    where: { id: id },
  });
  res.status(200).json({ cart });
};

const deleteCart = async (req, res) => {
  const { id } = req.params;
  await Cart.destroy({
    where: { id: id },
  });
  res.status(200).json({ msg: "cart cleared" });
};

module.exports = {
  createCart,
  getCart,
  updateCart,
  deleteCart,
};
