const db = require("../models");

const Settings = db.settings;

const createSettings = async (req, res) => {
  const { currency, formLayout } = req.body;
  const curr = await Settings.create({
    currency,
    formLayout,
  });
  res.status(201).json({ curr });
};

const getSettings = async (req, res) => {
  const settings = await Settings.findAll({});
  res.status(201).json(settings);
};

const updateSettings = async (req, res) => {
  const { id } = req.params;
  const { currency, formLayout } = req.body;
  await Settings.update(
    { currency: currency, formLayout: formLayout },
    { where: { id: id } }
  );
  res.status(201).json({ msg: "updated" });
};

module.exports = {
  createSettings,
  getSettings,
  updateSettings,
};
