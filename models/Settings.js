module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define("setting", {
    currency: {
      type: DataTypes.STRING,
      // defaultValue: "Indian Rupees ₹",
    },
    formLayout: {
      type: DataTypes.STRING,
      // defaultValue: "single-form",
    },
  });
  return Setting;
};
