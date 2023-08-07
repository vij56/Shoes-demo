const db = require("../models");

const Advertize = db.advertize;

const createAdvertize = async (req, res) => {
  const jsonData = req.body;
  console.log("------", jsonData);
  const advertize = await Advertize.create({ jsonData });
  res.status(201).json({ advertize });
};

const updateAdvertize = async (req, res) => {
  const { id } = req.params;
  await Advertize.findByPk(id).then(async (advertize) => {
    await advertize.update({
      ads_auto: req.body.ads_auto,
      desktop_ads_five: req.body.desktop_ads_five,
      desktop_ads_four: req.body.desktop_ads_four,
      desktop_ads_one: req.body.desktop_ads_one,
      desktop_ads_seven: req.body.desktop_ads_seven,
      desktop_ads_six: req.body.desktop_ads_six,
      desktop_ads_three: req.body.desktop_ads_three,
      desktop_ads_two: req.body.desktop_ads_two,
      mobile_ads_five: req.body.mobile_ads_five,
      mobile_ads_four: req.body.mobile_ads_four,
      mobile_ads_one: req.body.mobile_ads_one,
      mobile_ads_seven: req.body.mobile_ads_seven,
      mobile_ads_six: req.body.mobile_ads_six,
      mobile_ads_three: req.body.mobile_ads_three,
      mobile_ads_two: req.body.mobile_ads_two,
      tablets_ads_five: req.body.tablets_ads_five,
      tablets_ads_four: req.body.tablets_ads_four,
      tablets_ads_one: req.body.tablets_ads_one,
      tablets_ads_seven: req.body.tablets_ads_seven,
      tablets_ads_six: req.body.tablets_ads_six,
      tablets_ads_three: req.body.tablets_ads_three,
      tablets_ads_two: req.body.tablets_ads_two,
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
