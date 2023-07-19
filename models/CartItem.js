module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("cartItem", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    // size: {
    //   type: DataTypes.FLOAT,
    // },
    // subTotal: {
    //   type: DataTypes.FLOAT,
    // },
    // total: {
    //   type: DataTypes.FLOAT,
    // },
  });
  return CartItem;
};
