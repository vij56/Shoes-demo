const db = require("../models");
const { Op } = require("sequelize");

const Product = db.products;

const getAllProducts = async (req, res) => {
  const products = await Product.findAll({
    // To select only some attributes, you can use the 'attributes' option
    // attributes: ["image", ["title", "title_name"], "price"], // Attributes can be renamed using a nested array
    // attributes: { exclude: ["price"] }, // it's also possible to remove a selected few attributes
    // include: [Sequelize.fn("COUNT", Sequelize.col("id")), "id_counts"], // You can use 'sequelize.fn' to do aggregations
    // order: [["price", "DESC"]], // The order option takes an array of items to order the query by or a sequelize method. valid directions (such as ASC, DESC, NULLS FIRST, etc).
    // offset: 1, // allows to work with limiting / pagination
    limit: 10, // allows to work with limiting / pagination
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
  // The findAndCountAll method is a convenience method that combines findAll and count. This is useful when dealing with queries related to pagination where you want to retrieve data with a limit and offset but also need to know the total number of records that match the query.
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
  const { sort, limit, category } = req.body;
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
  Product.findAndCountAll().then((data) => {
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
