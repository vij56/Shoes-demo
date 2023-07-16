module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    quantity: {
      type: DataTypes.INTEGER,
    },
    size: {
      type: DataTypes.FLOAT,
    },
  });
  return Cart;
};
