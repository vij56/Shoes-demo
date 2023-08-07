module.exports = (sequelize, DataTypes) => {
  const Advertize = sequelize.define("advertize", {
    jsonData: {
      type: DataTypes.JSON, // You can also use DataTypes.TEXT if your MySQL version doesn't support JSON
      defaultValue: {}, // Default value for the JSON field (optional)
    },
  });
  return Advertize;
};
