const { Sequelize } = require("sequelize");
const db = require("../models");

const Cart = db.cart;
const Product = db.products;

const createCart = async (req, res) => {
  const { productId, size, quantity } = req.body;
  const cart = await Cart.findAll();
  let filteredProduct = cart.filter(item => item.productId === productId);

  if (
    cart.length > 0 &&
    filteredProduct[0]?.productId === productId &&
    filteredProduct[0]?.size === size
  ) {
    const updatedCart = await Cart.update(
      { quantity: filteredProduct[0]?.quantity + quantity },
      {
        where: { id: filteredProduct[0].id },
      }
    );
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

const getAllProductsFromCart = async (req, res) => {
  const cartProducts = await Cart.findAll({
    attributes: ["id", "size", "quantity"],
    include: [
      {
        model: Product,
        attributes: ["id", "image", "title", "price"],
      },
    ],
  });
  res.status(201).json(cartProducts);
};

const getCart = async (req, res) => {
  const id = req.params.id;
  const data = await Cart.findAll({
    attributes: ["size", "quantity"],
    include: [
      {
        model: Product,
        attributes: ["image", "title", "price"],
      },
    ],
    where: { id: id },
  });
  res.status(201).json(data);
};

const updateCart = async (req, res) => {
  // const { cartId, quantity } = req.body;
  // const foundCart = await Cart.findOne({ where: { id: cartId } });
  // const cart = await Cart.update(
  //   { quantity: foundCart.quantity + quantity },
  //   { where: { id: cartId } }
  // );
  const { product } = req.body;
  console.log("==>", product);
  // const tempArr = JSON.parse(product);
  // console.log("sfsfsfsf", tempArr);
  res.status(200).json({ product: product });
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
  getAllProductsFromCart,
};
