module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define("setting", {
    name: {
      type: DataTypes.STRING,
    },
  });
  return Setting;
};
