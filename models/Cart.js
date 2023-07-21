module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    quantity: {
      type: DataTypes.INTEGER,
    },
    size: {
      type: DataTypes.FLOAT,
    },
    price: {
      type: DataTypes.INTEGER,
      default: 0,
    },
    subTotal: {
      type: DataTypes.INTEGER,
      default: 0,
    },
    userId: {
      type: DataTypes.STRING,
    },
  });
  return Cart;
};
