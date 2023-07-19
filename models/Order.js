module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    companyName: {
      type: DataTypes.STRING,
    },
    streetAddress: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    pinCode: {
      type: DataTypes.BIGINT,
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
    },
    emailAddress: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      defaultValue: "Cash On Delivery",
    },
  });
  return Order;
};
