const { Sequelize } = require("sequelize");
const db = require("../models");

const Cart = db.cart;
const Product = db.products;

const createCart = async (req, res) => {
  const { productId, size, quantity, price } = req.body;
  const cart = await Cart.findAll();
  let filteredProduct = cart.filter((item) => item.productId === productId);

  if (cart.length > 0 && filteredProduct[0]?.productId === productId && filteredProduct[0]?.size === size) {
    const updatedCart = await Cart.update(
      { quantity: filteredProduct[0]?.quantity + quantity, subTotal: filteredProduct[0]?.price * (filteredProduct[0]?.quantity + quantity) },
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
      price,
    });
    if (quantity > 1) {
      updatedCart.subTotal = updatedCart.quantity * updatedCart.price;
      await updatedCart.save();
    } else {
      updatedCart.subTotal = price;
      await updatedCart.save();
    }
    return res.status(201).json({ updatedCart });
  }
};

const getAllProductsFromCart = async (req, res) => {
  const cartProducts = await Cart.findAll({
    attributes: ["id", "size", "quantity", "price", "subTotal"],
    include: [
      {
        model: Product,
        attributes: ["id", "image", "title"],
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
  const carts = await Cart.findAll();

  let tempArr = [];

  if (product.length > 0) {
    product.forEach((ele, item) => {
      carts.forEach((i, index) => {
        if (i.id === ele.id) {
          tempArr.push(ele);
        }
      });
    });
  }

  console.log(tempArr);

  // if (JSON.stringify(items) === JSON.stringify(id)) {
  //   const result = await Cart.update(
  //     product.map((item) => item.quantity),
  //     { where: { id: product.map((item) => item.id) } }
  //   );
  //   res.status(200).json(result);
  // }
  // let filteredProduct = carts.filter((item) => item.id === items.id);
  // const tempArr = JSON.parse(product);
  // console.log("sfsfsfsf", tempArr);
  // res.status(200).json({ items, id });
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
