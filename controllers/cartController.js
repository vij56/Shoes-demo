const { Sequelize } = require("sequelize");
const db = require("../models"); // finds index.js file by default, no need to define

// create main model
const Cart = db.cart;
const Product = db.products;

const createCart = async (req, res) => {
  const { productId, size, quantity } = req.body;
  const cart = await Cart.findAll();
  let filteredproduct = cart.filter(item => item.productId === productId);
  if (cart.length > 0 && filteredproduct[0]?.productId === productId) {
    const updatedCart = await Cart.update(req.body, {
      where: { id: filteredproduct[0].id },
    });
    return res.status(201).json({ updatedCart });
  } else {
    const updatedCart = await Cart.create({
      productId,
      size,
      quantity,
    });
    return res.status(201).json({ updatedCart });
  }
};

const getCart = async (req, res) => {
  // const id = req.params.id;
  const data = await Cart
    .findAll
    // attributes: ["image", "title", "price"],
    // include: [
    //   {
    //     model: Cart,
    //     attributes: ["size", "quantity"],
    //   },
    // ],
    // where: { id: id },
    ();
  res.status(201).json(data);
};

const updateCart = async (req, res) => {
  const cartId = parseInt(req.params.cartId);
  let cart;
  cart = await Cart.findOne({ where: { id: cartId } });
  if (cart.id === cartId) {
    cart = await Cart.update(req.body, { where: { id: cart.id } });
  }
  cart = await Cart.create(req.body);
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
