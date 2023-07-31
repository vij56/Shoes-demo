module.exports = (sequelize, DataTypes) => {
  const Advertize = sequelize.define("advertize", {
    ads_auto: {
      type: DataTypes.TEXT,
    },
    desktop_ads_one: {
      type: DataTypes.TEXT,
    },
    desktop_ads_two: {
      type: DataTypes.TEXT,
    },
    desktop_ads_three: {
      type: DataTypes.TEXT,
    },
    desktop_ads_four: {
      type: DataTypes.TEXT,
    },
    desktop_ads_five: {
      type: DataTypes.TEXT,
    },
    desktop_ads_six: {
      type: DataTypes.TEXT,
    },
    desktop_ads_seven: {
      type: DataTypes.TEXT,
    },
    tablets_ads_one: {
      type: DataTypes.TEXT,
    },
    tablets_ads_two: {
      type: DataTypes.TEXT,
    },
    tablets_ads_three: {
      type: DataTypes.TEXT,
    },
    tablets_ads_four: {
      type: DataTypes.TEXT,
    },
    tablets_ads_five: {
      type: DataTypes.TEXT,
    },
    tablets_ads_six: {
      type: DataTypes.TEXT,
    },
    tablets_ads_seven: {
      type: DataTypes.TEXT,
    },
    mobile_ads_one: {
      type: DataTypes.TEXT,
    },
    mobile_ads_two: {
      type: DataTypes.TEXT,
    },
    mobile_ads_three: {
      type: DataTypes.TEXT,
    },
    mobile_ads_four: {
      type: DataTypes.TEXT,
    },
    mobile_ads_five: {
      type: DataTypes.TEXT,
    },
    mobile_ads_six: {
      type: DataTypes.TEXT,
    },
    mobile_ads_seven: {
      type: DataTypes.TEXT,
    },
  });
  return Advertize;
};
