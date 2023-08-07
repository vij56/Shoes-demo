const db = require("../models");

const Attributes = db.attributes;

const createAttributes = async (req, res) => {
  const { name } = req.body;
  const attribute = await Attributes.create({
    name,
  });
  res.status(201).json({ attribute });
};

const getAttributes = async (req, res) => {
  const attribute = await Attributes.findAll({});
  res.status(201).json(attribute);
};

const deleteAttribute = async (req, res) => {
  const { id } = req.params;
  await Attributes.destroy({
    where: { id: id },
  });
  res.status(200).json({ msg: "delete Category" });
};

module.exports = {
  createAttributes,
  getAttributes,
  deleteAttribute,
};
