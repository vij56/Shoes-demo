module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    product_id: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    size: {
      type: DataTypes.INTEGER,
    },
  });
  return Cart;
};
