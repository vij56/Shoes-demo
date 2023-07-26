const csv = require("csvtojson");
const data_exporter = require("json2csv").Parser;
const db = require("../models");
const multiParty = require("multiparty");

const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("itbuddies.csv");

const Product = db.products;

const dir = "./public/images";

const addProduct = async (req, res) => {
  const form = new multiParty.Form({ uploadDir: dir });
  form.parse(req, async function (err, fields, files) {
    if (err) return res.status(500).json({ err: err.message });
    let tempArray = [];
    for (const f of files.file) {
      tempArray.push(process.env.IMAGE_BASE_URL + f.path.slice(7));
    }
    const product = await Product.create({
      title: fields.title[0],
      description: fields.description[0],
      productPrice: fields.productPrice[0],
      salePrice: fields.salePrice[0],
      skuId: fields.sku[0],
      size: fields.size[0],
    });
    product.image = tempArray;
    await product.save();
    res.status(201).json({ product });
  });
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
  const form = new multiParty.Form({ uploadDir: dir });
  form.parse(req, async function (err, fields, files) {
    if (files.file) {
      let tempArray = [];
      for (const f of files.file) {
        tempArray.push(process.env.IMAGE_BASE_URL + f.path.slice(7));
      }
      const product = await Product.update(
        {
          image: tempArray,
          title: fields.title[0],
          description: fields.description[0],
          productPrice: fields.productPrice[0],
          salePrice: fields.salePrice[0],
        },
        { where: { id: id } }
      );
      res.status(201).json({ product });
    } else {
      const product = await Product.update(
        {
          title: fields.title[0],
          description: fields.description[0],
          productPrice: fields.productPrice[0],
          salePrice: fields.salePrice[0],
        },
        { where: { id: id } }
      );
      res.status(201).json({ product });
    }
  });
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
          salePrice: parseInt(result[i].salePrice),
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
