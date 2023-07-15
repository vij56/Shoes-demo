module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    productId: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    size: {
      type: DataTypes.FLOAT,
    },
  });
  return Cart;
};
