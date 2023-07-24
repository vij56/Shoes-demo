const csv = require("csvtojson");
const db = require("../models");
const excel = require("exceljs");

const Product = db.products;

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
          image: result[i].image,
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
        await foundProduct.update({
          image: item.image,
          title: item.title,
          salePrice: item.salePrice,
          description: item.description,
          productPrice: item.productPrice,
          skuId: item.skuId,
          category: item.category,
        });
      }
      res.status(201).json({ product });
    });
};

const downloadFile = async (req, res) => {
  Product.findAll({}).then(async (prod) => {
    const products = [];
    for (let i = 0; i < prod.length; i++) {
      const datavalues = prod[i].dataValues;
      console.log(datavalues);
      const product = {
        id: datavalues.id,
        image: datavalues.image,
        title: datavalues.title,
        salePrice: datavalues.salePrice,
        description: datavalues.description,
        productPrice: datavalues.productPrice,
        skuId: datavalues.skuId,
        category: datavalues.category,
      };
      products.push(product);
    }
    const jsonProducts = JSON.parse(JSON.stringify(products));
    let workbook = new excel.Workbook(); //creating workbook
    let worksheet = workbook.addWorksheet("Products"); //creating worksheet
    worksheet.columns = [
      { header: "Id", key: "id", width: 10 },
      { header: "Image", key: "image", width: 30 },
      { header: "Title", key: "title", width: 30 },
      { header: "SalePrice", key: "salePrice", width: 30 },
      { header: "Description", key: "description", width: 30 },
      { header: "ProductPrice", key: "productPrice", width: 30 },
      { header: "SkuId", key: "skuId", width: 30 },
      { header: "Category", key: "category", width: 30, outlineLevel: 1 },
    ];
    // Add Array Rows
    worksheet.addRows(jsonProducts);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "products.xlsx"
    );
    await workbook.xlsx.write(res);
    res.status(200).end();
  });
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
