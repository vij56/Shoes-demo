const db = require("../models");

const Category = db.category;

const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({
    name,
  });
  res.status(201).json({ category });
};

const getCategorys = async (req, res) => {
  const category = await Category.findAll({});
  res.status(201).json(category);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.destroy({
    where: { id: id },
  });
  res.status(200).json({ msg: "delete Category" });
};

module.exports = {
  createCategory,
  getCategorys,
  deleteCategory,
};
