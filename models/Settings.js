module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define("setting", {
    currency: {
      type: DataTypes.STRING,
    },
    formLayout: {
      type: DataTypes.STRING,
    },
  });
  return Setting;
};
