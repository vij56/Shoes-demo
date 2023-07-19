module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    size: {
      type: DataTypes.FLOAT,
    },
    // subTotal: {
    //   type: DataTypes.FLOAT,
    // },
    // total: {
    //   type: DataTypes.FLOAT,
    // },
  });
  return Cart;
};
