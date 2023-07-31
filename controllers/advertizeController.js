const db = require("../models");

const Advertize = db.advertize;

const createAdvertize = async (req, res) => {
  const advertizes = await Advertize.bulkCreate(req.body);
  res.status(201).json({ advertizes });
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
};
