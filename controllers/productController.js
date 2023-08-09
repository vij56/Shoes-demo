const db = require("../models");
const { Op } = require("sequelize");

const Product = db.products;

const getAllProducts = async (req, res) => {
  const products = await Product.findAll({
    limit: 10,
  });
  res.status(200).json({ products });
};

const getRelatedProducts = async (req, res) => {
  const products = await Product.findAll({});
  const shuffledProducts = products.sort(() => 0.5 - Math.random());
  const relatedProducts = shuffledProducts.slice(0, 4); // number of elements we want to get (4)
  res.status(200).json({ relatedProducts });
};

const getProducts = async (req, res) => {
  const { limit } = req.body;
  let { offset } = req.body; // page number
  Product.findAndCountAll().then((data) => {
    const pages = Math.ceil(data.count / limit);
    offset = limit * (offset - 1);
    Product.findAll({
      limit: limit,
      offset: offset,
    }).then((products) => {
      res.status(200).json({ products, count: data.count, pages });
    });
  });
};

const getSingleProduct = async (req, res) => {
  const { id, popularity } = req.body;
  const product = await Product.findOne({ where: { id: id } });
  if (product) {
    await product.set({
      popularity: product.popularity + popularity,
    });
    await product.save();
    return res.status(200).json({ product });
  } else {
    return res.status(200).json({ product });
  }
};

const shortProducts = async (req, res) => {
  const { category } = req.params;
  const { sort, limit } = req.body;
  let { offset } = req.body; // page number
  let order;
  let query;
  if (sort.includes("high to low")) {
    query = [["salePrice", "DESC"]];
  } else if (sort.includes("low to high")) {
    query = [["salePrice", "ASC"]];
  } else if (sort.includes("latest")) {
    query = [["createdAt", "DESC"]];
  } else if (sort.includes("popularity")) {
    query = [["popularity", "DESC"]];
  }
  order = query;
  Product.findAndCountAll({ where: { category: category } }).then((data) => {
    const pages = Math.ceil(data.count / limit);
    offset = limit * (offset - 1);
    Product.findAll({
      limit: limit,
      offset: offset,
      order: order,
      where: { category: category },
    }).then((products) => {
      res.status(200).json({
        products,
        count: data.count,
        pages,
      });
    });
  });
};

const searchProductByKeyword = async (req, res) => {
  const { searchByTitle } = req.body;
  if (!searchByTitle) {
    return res.status(200).json({ data: [] });
  }
  const data = await Product.findAll({
    where: {
      title: {
        [Op.like]: "%" + searchByTitle + "%",
      },
    },
  });
  res.status(200).json(data);
};

module.exports = {
  getAllProducts,
  getProducts,
  getSingleProduct,
  shortProducts,
  getRelatedProducts,
  searchProductByKeyword,
};
