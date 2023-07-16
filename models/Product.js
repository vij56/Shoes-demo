module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    image: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 99.99,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
  return Product;
};
