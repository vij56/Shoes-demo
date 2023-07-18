module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    // id: {
    //   type: DataTypes.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true,
    // },
    firstName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
    },
    streetAddress: {
      type: DataTypes.TEXT,
      // allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    pinCode: {
      type: DataTypes.BIGINT,
      // allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      // allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      defaultValue: "Cash On Delivery",
    },
    // productId: {
    //   type: DataTypes.INTEGER,
    // },
    // cartId: {
    //   type: DataTypes.INTEGER,
    // },
  });
  return Order;
};
