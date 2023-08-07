module.exports = (sequelize, DataTypes) => {
  const Attributes = sequelize.define("attributes", {
    name: {
      type: DataTypes.STRING,
    },
  });
  return Attributes;
};
