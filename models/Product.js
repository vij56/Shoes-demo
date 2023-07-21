module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    image: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    salePrice: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    productPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 1200,
    },
    popularity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    skuId: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
  });
  return Product;
};
