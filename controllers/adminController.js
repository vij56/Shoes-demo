const csv = require("csvtojson");
const db = require("../models");
const multiParty = require("multiparty");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Product = db.products;
const Admin = db.admin;
const PageContents = db.pageContents;
const Order = db.order;

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
  const {
    title,
    description,
    salePrice,
    productPrice,
    sku,
    attribute,
    size,
    category,
  } = req.body;
  const imageArray = [];
  for (const image of req.files) {
    imageArray.push(process.env.IMAGE_BASE_URL + image.path.slice(7));
  }
  const product = await Product.create({
    image: imageArray,
    title,
    description,
    salePrice,
    productPrice,
    skuId: sku,
    size,
    category,
    attribute: attribute?.length > 0 ? attribute : [],
  });
  res.status(201).json({ product });
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
  const {
    title,
    description,
    salePrice,
    productPrice,
    sku,
    attribute,
    size,
    category,
  } = req.body;
  const imageArray = [];
  await Product.findOne({ where: { id: id } })
    .then((product) => {
      if (req.files.length >= 1) {
        for (const image of req.files) {
          imageArray.push(process.env.IMAGE_BASE_URL + image.path.slice(7));
        }
        const images = product.image.concat(imageArray);
        product.update({
          image: images,
          title: title,
          description: description,
          productPrice: productPrice,
          salePrice: salePrice,
          size: size.toString(),
          category: category,
          attribute: attribute.toString(),
          skuId: sku,
        });
        return res.status(200).json(product);
      } else {
        product.update({
          title,
          description,
          salePrice,
          productPrice,
          skuId: sku,
          attribute,
          size,
          category,
        });
        return res.status(200).json(product);
      }
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  await Product.destroy({ where: { id: id } });
  res.status(200).json({ msg: "Deleted" });
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
        const foundProduct = await Product.findOne({
          where: { id: parseInt(item.id) },
        });
        if (foundProduct) {
          const image = item.image.split(",");
          const size = item.size.split(",");
          const attribute = !item.attribute ? [] : item.attribute.split(",");
          await foundProduct.update({
            image: image,
            title: item.title,
            salePrice: parseInt(item.salePrice),
            description: item.description,
            productPrice: item.productPrice,
            skuId: item.skuId,
            category: item.category,
            size: JSON.stringify(size),
            attribute: JSON.stringify(attribute),
          });
        } else {
          const items = [];
          for (i = 0; i < result.length; i++) {
            const image = result[i].image.split(",");
            const size = result[i].size.split(",");
            const attribute = !result[i].attribute
              ? []
              : result[i].attribute.split(",");
            items.push({
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
          const products = await Product.bulkCreate(items);
          return res.status(201).json({ products });
        }
      }
      res.status(200).json({ msg: "products are updated successfully" });
    })
    .catch((e) => {
      res.status(500).json({ msg: e.message });
    });
};

const createAllContents = async (req, res) => {
  const form = new multiParty.Form({ uploadDir: dir });
  form.parse(req, async function (err, fields, files) {
    if (err) return res.status(500).json({ err: err.message });
    let imageArray = [];
    if (files.logo_path_name) {
      for (const image of files.logo_path_name) {
        imageArray.push(process.env.IMAGE_BASE_URL + image.path.slice(7));
      }
      const content = await PageContents.create({
        about_us: fields.about_us[0],
        contact_us: fields.contact_us[0],
        acceptable_use_policy: fields.acceptable_use_policy[0],
        faqs: fields.faqs[0],
        disclaimer: fields.disclaimer[0],
        return_refund_cancellection_shipping_policy:
          fields.return_refund_cancellection_shipping_policy[0],
        privacy_policy: fields.privacy_policy[0],
        terms_and_conditions: fields.terms_and_conditions[0],
        logo_path_name: imageArray,
      });
      res.status(201).json({ content });
    }
  });
};

const retrieveAllContents = async (req, res) => {
  const contents = await PageContents.findAll({});
  res.status(200).json(contents);
};

const deleteOrder = async (req, res) => {
  const { id } = req.body;
  await Order.destroy({ where: { id: id } });
  res.status(200).json({ msg: "Deleted" });
};

const updateAllContents = async (req, res) => {
  const { id } = req.params;
  const imageArray = [];
  const form = new multiParty.Form({ uploadDir: dir });
  form.parse(req, async function (err, fields, files) {
    await PageContents.findByPk(id)
      .then((contents) => {
        if (contents) {
          if (files.logo_path_name) {
            for (const image of files.logo_path_name) {
              imageArray.push(process.env.IMAGE_BASE_URL + image.path.slice(7));
            }
            contents.update({
              about_us: fields.about_us[0],
              contact_us: fields.contact_us[0],
              acceptable_use_policy: fields.acceptable_use_policy[0],
              faqs: fields.faqs[0],
              disclaimer: fields.disclaimer[0],
              return_refund_cancellection_shipping_policy:
                fields.return_refund_cancellection_shipping_policy[0],
              privacy_policy: fields.privacy_policy[0],
              terms_and_conditions: fields.terms_and_conditions[0],
              logo_path_name: imageArray,
            });
            return res.status(200).json(contents);
          }
          contents.update({
            about_us: fields.about_us[0],
            contact_us: fields.contact_us[0],
            acceptable_use_policy: fields.acceptable_use_policy[0],
            faqs: fields.faqs[0],
            disclaimer: fields.disclaimer[0],
            return_refund_cancellection_shipping_policy:
              fields.return_refund_cancellection_shipping_policy[0],
            privacy_policy: fields.privacy_policy[0],
            terms_and_conditions: fields.terms_and_conditions[0],
            logo_path_name: files.logo_path_name,
          });
          return res.status(200).json(contents);
        } else {
          return res.status(404).json({ msg: "no product found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
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
  deleteOrder,
};
