const db = require("../models");

const Advertize = db.advertize;

const createAdvertize = async (req, res) => {
  const jsonData = req.body;
  const advertize = await Advertize.create({ jsonData });
  res.status(201).json({ advertize });
};

const updateAdvertize = async (req, res) => {
  const { id } = req.params;
  const jsonData = req.body;
  await Advertize.findByPk(id).then(async advertize => {
    await advertize.update({
      jsonData,
    });
    await advertize.save();
    res.status(200).json({ advertize });
  });
};

const getSingleAdvertize = async (req, res) => {
  const { id } = req.params;
  const advertize = await Advertize.findByPk(id);
  res.status(200).json({ advertize });
};

const getAllAdvertize = async (req, res) => {
  const advertizes = await Advertize.findAll();
  res.status(200).json({ advertizes });
};

module.exports = {
  createAdvertize,
  getSingleAdvertize,
  getAllAdvertize,
  updateAdvertize,
};
