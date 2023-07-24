module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    image: {
      type: DataTypes.TEXT,
      get() {
        // When retrieving the value, parse the string to an array
        const data = this.getDataValue("image");
        return data ? JSON.parse(data) : [];
      },
      set(value) {
        // When setting the value, convert the array to a string
        this.setDataValue("image", JSON.stringify(value));
      },
    },
    title: {
      type: DataTypes.STRING,
    },
    salePrice: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
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
