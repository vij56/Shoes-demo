module.exports = (sequelize, DataTypes) => {
  const Advertize = sequelize.define("advertize", {
    script: {
      type: DataTypes.TEXT,
    },
  });
  return Advertize;
};
