const csv = require("csvtojson");
const data_exporter = require("json2csv").Parser;
const db = require("../models");

const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("itbuddies.csv");

const Product = db.products;

const addProduct = async (req, res) => {
  console.log(req.image);
  // if (req.body.length > 1) {
  //   const products = await Product.bulkCreate(req.body);
  //   res.status(201).json({ products });
  // } else {
  //   const product = await Product.create(req.body);
  //   product.image = req.body.image;
  //   await product.save();
  //   res.status(201).json({ product });
  // }
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

const uploadFile = async (req, res) => {
  if (req.file === undefined) {
    return res.status(400).send("Please upload csv file!");
  }
  const product = [];
  csv()
    .fromFile(req.file.path)
    .then(async (result) => {
      for (i = 0; i < result.length; i++) {
        product.push({
          image: JSON.parse(result[i].image),
          title: result[i].title,
          salePrice: result[i].salePrice,
          description: result[i].description,
          productPrice: result[i].productPrice,
          skuId: result[i].skuId,
          category: result[i].category,
        });
      }
      const products = await Product.bulkCreate(product);
      res.status(201).json({ products });
    });
};

const updateFile = async (req, res) => {
  if (req.file === undefined) {
    return res.status(400).send("Please upload csv file!");
  }
  const product = [];
  csv()
    .fromFile(req.file.path)
    .then(async (result) => {
      for (i = 0; i < result.length; i++) {
        product.push({
          id: result[i].id,
          image: result[i].image,
          title: result[i].title,
          salePrice: result[i].salePrice,
          description: result[i].description,
          productPrice: result[i].productPrice,
          skuId: result[i].skuId,
          category: result[i].category,
        });
      }
      for (const item of product) {
        const foundProduct = await Product.findOne({ where: { id: item.id } });
        if (foundProduct) {
          await foundProduct.update({
            image: JSON.parse(item.image),
            title: item.title,
            salePrice: item.salePrice,
            description: item.description,
            productPrice: item.productPrice,
            skuId: item.skuId,
            category: item.category,
          });
        } else {
          return res.status(400).json({ msg: "No product found to update" });
        }
      }
      res.status(201).json({ msg: "products are updated successfully" });
    });
};

const downloadFile = async (req, res) => {
  const prods = await Product.findAll({});
  const mysql_data = JSON.parse(JSON.stringify(prods));
  fastcsv
    .write(mysql_data, { headers: true })
    .on("finish", function () {
      console.log("Write to itbuddies.csv successfully!");
    })
    .pipe(ws);
  // const file_header = ["Id", "Image", "Title", "Sale Price", "Description", "Product Price", "Sku ID", "Category"];
  // const json_data = new data_exporter({ file_header });
  // const csv_data = json_data.parse(mysql_data);
  // res.setHeader("Content-Type", "text/csv");
  // res.setHeader("Content-Disposition", "attachment; filename=sample_data.csv");
  // res.status(200).json({ csv_data });
};

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadFile,
  updateFile,
  downloadFile,
};
