const { Sequelize } = require("sequelize");
const db = require("../models");

const Product = db.products;
const Admin = db.admin;
const Cart = db.cart;

const addProduct = async (req, res) => {
  if (req.body.length > 1) {
    const products = await Product.bulkCreate(req.body);
    res.status(201).json({ products });
  } else {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  }
};

const getAllProducts = async (req, res) => {
  const products = await Product.findAll({});
  res.status(200).json({ products });
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id: id } });
  res.status(200).json({ product });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.update(req.body, { where: { id: id } });
  res.status(200).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.destroy({ where: { id: id } });
  res.status(200).json({ product });
};

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
