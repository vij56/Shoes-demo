const db = require("../models");

const Settings = db.settings;

const createCurrency = async (req, res) => {
  const { name } = req.body;
  const currency = await Settings.create({
    name,
  });
  res.status(201).json({ currency });
};

const getCurrency = async (req, res) => {
  const currency = await Settings.findAll();
  res.status(201).json(currency);
};

const updateCurrency = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log("id- ", id, "name-", name);
  await Settings.update({ name: name }, { where: { id: id } });
  res.status(201).json({ msg: "updated" });
};

module.exports = {
  createCurrency,
  getCurrency,
  updateCurrency,
};
