module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    image: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    salePrice: {
      type: DataTypes.FLOAT,
    },
    description: {
      type: DataTypes.STRING,
    },
    productPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 1199.99,
    },
  });
  return Product;
};
