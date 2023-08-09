const csv = require("csvtojson");
const data_exporter = require("json2csv").Parser;
const db = require("../models");
const multiParty = require("multiparty");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("itbuddies.csv");

const Product = db.products;
const Admin = db.admin;
const PageContents = db.pageContents;

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
    process.env.JWT_SECRET
  );
  res.status(201).json({ msg: "logged in", token });
};

const addProduct = async (req, res) => {
  const form = new multiParty.Form({ uploadDir: dir });
  form.parse(req, async function (err, fields, files) {
    if (err) return res.status(500).json({ err: err.message });
    let imageArray = [];
    if (files.file) {
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
        category: fields.category[0],
        attribute: fields.attribute?.length > 0 ? fields.attribute[0] : [],
      });
      res.status(201).json({ product });
    }
  });
};

const getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.status(200).json({ products });
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: { id: id } });
  res.status(200).json({ product });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const imageArray = [];
  const sizeArray = [];
  const form = new multiParty.Form({ uploadDir: dir });
  form.parse(req, async function (err, fields, files) {
    await Product.findByPk(id)
      .then(product => {
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
              size: fields.size.toString(),
              category: fields.category[0],
              attribute: fields.attribute.toString(),
            });
            return res.status(200).json(product);
          }
          product.update({
            image: files.file,
            title: fields.title[0],
            description: fields.description[0],
            productPrice: fields.productPrice[0],
            salePrice: fields.salePrice[0],
            size: fields.size[0],
            category: fields.category[0],
            attribute: fields.attribute[0],
          });
          return res.status(200).json(product);
        } else {
          return res.status(404).json({ msg: "no product found" });
        }
      })
      .catch(err => {
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
    .then(async result => {
      for (i = 0; i < result.length; i++) {
        const image = result[i].image.split(",");
        const size = result[i].size.split(",");
        console.log(
          "159 ===>",
          result[i].attribute,
          typeof result[i].attribute
        );
        const attribute = !result[i].attribute
          ? []
          : result[i].attribute.split(",");
        product.push({
          image: image,
          title: result[i].title,
          salePrice: parseInt(result[i].salePrice),
          description: result[i].description,
          productPrice: result[i].productPrice,
          skuId: result[i].skuId,
          category: result[i].category,
          size: JSON.stringify(size),
          attribute: JSON.stringify(attribute),
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
    .then(async result => {
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

const createAllContents = async (req, res) => {
  const {
    about_us,
    contact_us,
    faqs,
    disclaimer,
    return_refund_cancellection_shipping_policy,
    privacy_policy,
    terms_and_conditions,
    logo_path_name,
    brand_tagline,
    brand_favicon,
  } = req.body;
  const contents = await PageContents.create({
    about_us,
    contact_us,
    faqs,
    disclaimer,
    return_refund_cancellection_shipping_policy,
    privacy_policy,
    terms_and_conditions,
    logo_path_name,
    brand_tagline,
    brand_favicon,
  });
  res.status(201).json(contents);
};

const retrieveAllContents = async (req, res) => {
  const contents = await PageContents.findAll({});
  res.status(200).json(contents);
};

const updateAllContents = async (req, res) => {
  const { id } = req.params;
  await PageContents.findByPk(id)
    .then(async contents => {
      (contents.about_us = req.body.about_us),
        (contents.contact_us = req.body.about_us),
        (contents.faqs = req.body.faqs),
        (contents.disclaimer = req.body.disclaimer),
        (contents.return_refund_cancellection_shipping_policy =
          req.body.return_refund_cancellection_shipping_policy),
        (contents.privacy_policy = req.body.privacy_policy),
        (contents.terms_and_conditions = req.body.terms_and_conditions),
        (contents.logo_path_name = req.body.logo_path_name),
        (contents.brand_tagline = req.body.brand_tagline),
        (contents.brand_favicon = req.body.brand_favicon),
        await contents.save();
      return res.status(200).json({ msg: "updated" });
    })
    .catch(err => {
      res.status(500).json({ msg: err.message });
    });
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
  createAllContents,
  retrieveAllContents,
  updateAllContents,
};
