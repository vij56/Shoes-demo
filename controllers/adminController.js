const csv = require("csvtojson");
const data_exporter = require("json2csv").Parser;
const db = require("../models");
const multiParty = require("multiparty");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("itbuddies.csv");

const Product = db.products;
const Admin = db.admin;

const dir = "./public/images";

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const isAdminExists = await Admin.findOne({
    where: { email: email },
  });
  if (isAdminExists) {
    return res.status(400).json({ msg: `${email} is already registered` });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const admin = await Admin.create({
    email: email,
    password: hashedPassword,
  });
  res.status(201).json(admin);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "please provide all values" });
  }
  const isAdminExists = await Admin.findOne({
    where: { email: email },
  });
  if (!isAdminExists) {
    return res.status(400).json({ msg: `${email} is not registered` });
  }
  const MatchPassword = await bcrypt.compare(password, isAdminExists.password);
  if (!MatchPassword) {
    return res.status(400).json({ msg: "incorrect password" });
  }
  const token = jwt.sign(
    { id: isAdminExists.id, email: isAdminExists.email },
    process.env.JWT_SECRET,
    { expiresIn: 60 }
  );
  res.status(201).json({ msg: "logged in", token });
};

const addProduct = async (req, res) => {
  const form = new multiParty.Form({ uploadDir: dir });
  form.parse(req, async function (err, fields, files) {
    if (err) return res.status(500).json({ err: err.message });
    let imageArray = [];
    for (const image of files.file) {
      imageArray.push(process.env.IMAGE_BASE_URL + image.path.slice(7));
    }
    const product = await Product.create({
      image: imageArray,
      title: fields.title[0],
      description: fields.description[0],
      productPrice: fields.productPrice[0],
      salePrice: fields.salePrice[0],
      skuId: fields.sku[0],
      size: fields.size[0],
    });
    res.status(201).json({ product });
  });
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
  const { id } = req.params;
  const product = await Product.findOne({ where: { id: id } });
  res.status(200).json({ product });
};

// const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const form = new multiParty.Form({ uploadDir: dir });
//   form.parse(req, async function (err, fields, files) {
//     const fProduct = await Product.findOne({ where: { id: id } });
//     const imageArray = fProduct.image;
//     const sizeArray = fProduct.size;
//     if (files.file) {
//       for (const image of files.file) {
//         imageArray.push(process.env.IMAGE_BASE_URL + image.path.slice(7));
//       }
//       for (const size of fields.size) {
//         sizeArray.push(size);
//       }
//       const product = await Product.update(
//         {
//           image: imageArray,
//           title: fields.title[0],
//           description: fields.description[0],
//           productPrice: fields.productPrice[0],
//           salePrice: fields.salePrice[0],
//           // size: sizeArray,
//         },
//         { where: { id: id } }
//       );
//       return res.status(201).json({ product });
//     }
//     const product = await Product.update(
//       {
//         image: files.file,
//         title: fields.title[0],
//         description: fields.description[0],
//         productPrice: fields.productPrice[0],
//         salePrice: fields.salePrice[0],
//         size: fields.size,
//       },
//       { where: { id: id } }
//     );
//     res.status(201).json({ product });
//   });
// };

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const imageArray = [];
  const sizeArray = [];
  const form = new multiParty.Form({ uploadDir: dir });
  form.parse(req, async function (err, fields, files) {
    await Product.findByPk(id)
      .then((product) => {
        if (product) {
          if (files.file) {
            for (const image of files.file) {
              imageArray.push(
                ...product.image,
                process.env.IMAGE_BASE_URL + image.path.slice(7)
              );
            }
            product.update({
              image: imageArray,
              title: fields.title[0],
              description: fields.description[0],
              productPrice: fields.productPrice[0],
              salePrice: fields.salePrice[0],
              // size: product.size,
            });
            return res.status(200).json(product);
          }
          // const stringWithoutBrackets = fields.size[0].replace(/\[|\]/g, ""); // remove square brackets from the string
          // const resultArray = JSON.parse("[" + stringWithoutBrackets + "]"); // parse the modified string into an array
          // const a = Object.values(resultArray);
          // for (const size of resultArray) {
          //   sizeArray.push(size);
          // }
          product.update({
            image: files.file,
            title: fields.title[0],
            description: fields.description[0],
            productPrice: fields.productPrice[0],
            salePrice: fields.salePrice[0],
            // size: sizeArray,
          });
          return res.status(200).json(product);
        } else {
          return res.status(404).json({ msg: "no product found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
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
        const image = result[i].image.split(",");
        const size = result[i].size.split(",");
        product.push({
          image: image,
          title: result[i].title,
          salePrice: parseInt(result[i].salePrice),
          description: result[i].description,
          productPrice: result[i].productPrice,
          skuId: result[i].skuId,
          category: result[i].category,
          size: size,
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
          size: result[i].size,
        });
      }
      for (const item of product) {
        const foundProduct = await Product.findOne({ where: { id: item.id } });
        if (foundProduct) {
          await foundProduct.update({
            id: item.id,
            image: JSON.parse(item.image),
            title: item.title,
            salePrice: item.salePrice,
            description: item.description,
            productPrice: item.productPrice,
            skuId: item.skuId,
            category: item.category,
            size: item.size,
          });
        } else {
          return res.status(400).json({ msg: "No product found to update" });
        }
      }
      res.status(200).json({ msg: "products are updated successfully" });
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

const dummy = (req, res) => {
  res.status(200).json(req.admin);
};

module.exports = {
  signUp,
  login,
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadFile,
  downloadFile,
  dummy,
};
