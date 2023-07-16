const { Sequelize } = require("sequelize");
const db = require("../models"); // finds index.js file by default, no need to define

// create main model
const Cart = db.cart;
const Product = db.products;

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
  const id = parseInt(req.params.id);
  const data = await Product.findOne({
    attributes: ["image", "title", "price"],
    include: [
      {
        model: Cart,
        attributes: ["size", "quantity"],
      },
    ],
    where: { id: id },
  });
  res.status(201).json({ data });
};

const updateCart = async (req, res) => {
  const cartId = parseInt(req.params.cartId);
  const cart = await Cart.update(req.body, {
    where: { id: cartId },
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
