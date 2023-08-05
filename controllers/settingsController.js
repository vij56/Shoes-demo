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

// const createFormLayout = async (req, res) => {
//   const { formType } = req.body;
//   const form = await Settings.create({
//     formLayout: formType,
//   });
//   res.status(201).json({ form });
// };

// const getFormLayout = async (req, res) => {
//   const form = await Settings.findAll({});
//   res.status(201).json(form);
// };

// const updateFormLayout = async (req, res) => {
//   const { id } = req.params;
//   const { formType } = req.body;
//   await Settings.update({ formLayout: formType }, { where: { id: id } });
//   res.status(201).json({ msg: "updated" });
// };

module.exports = {
  createSettings,
  getSettings,
  updateSettings,
  // createFormLayout,
  // getFormLayout,
  // updateFormLayout,s
};
