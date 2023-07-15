const { Sequelize } = require("sequelize");
const db = require("../models"); // finds index.js file by default, no need to define

// create main model
const Product = db.products;
const Review = db.reviews;

const addProduct = async (req, res) => {
  if (req.body.length > 1) {
    const products = await Product.bulkCreate(req.body);
    res.status(201).json({ products });
  } else {
    const product = await Product.create(req.body);
    res.status(201).json({ product });
  }
};

const findOrCreateProduct = async (req, res) => {
  // The method findOrCreate will create an entry in the table unless it can find one fulfilling the query options. In both cases, it will return an instance (either the found instance or the created instance) and a boolean indicating whether that instance was created or already existed.
  const [product, created] = await Product.findOrCreate({
    // The where option is considered for finding the entry, and the defaults option is used to define what must be created in case nothing was found. If the defaults do not contain values for every column, Sequelize will take the values given to where (if present).
    where: { price: req.body.price },
    defaults: {
      title: "default title",
    },
  });
  res.status(201).json({ product, created });
};

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

const getProducts = async (req, res) => {
  const { limit } = req.body;
  let { offset } = req.body; // page number

  // The findAndCountAll method is a convenience method that combines findAll and count. This is useful when dealing with queries related to pagination where you want to retrieve data with a limit and offset but also need to know the total number of records that match the query.
  Product.findAndCountAll().then(data => {
    const pages = Math.ceil(data.count / limit);
    offset = limit * (offset - 1);

    Product.findAll({
      limit: limit,
      offset: offset,
    }).then(products => {
      res.status(200).json({ products, count: data.count, pages });
    });
  });
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  // The findOne method obtains the first entry it finds (that fulfills the optional query options, if provided).
  const product = await Product.findOne({ where: { id: id } });
  res.status(200).json({ product });
};

const shortProducts = async (req, res) => {
  const sort = JSON.stringify(req.body.sort);
  const { limit } = req.body;
  let { offset } = req.body; // page number

  let order;

  // sorting
  let query;
  if (sort.includes("high to low")) {
    query = [["price", "DESC"]];
  } else if (sort.includes("low to high")) {
    query = [["price", "ASC"]];
  } else if (sort.includes("latest")) {
    query = [["createdAt", "DESC"]];
  }

  order = query;

  Product.findAndCountAll().then(data => {
    const pages = Math.ceil(data.count / limit);
    offset = limit * (offset - 1);

    Product.findAll({
      limit: limit,
      offset: offset,
      order: order,
    }).then(products => {
      res.status(200).json({
        products,
        count: data.count,
        pages,
      });
    });
  });
};

const getProductReviews = async (req, res) => {
  const { productId } = req.body;
  const data = await Product.findAll({
    include: [
      {
        model: Review,
        as: "review",
      },
    ],
    where: { id: productId },
  });
  res.status(200).json({ data });
};

module.exports = {
  addProduct,
  getAllProducts,
  getProducts,
  getSingleProduct,
  shortProducts,
};
