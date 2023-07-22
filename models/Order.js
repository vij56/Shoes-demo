module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    companyName: {
      type: DataTypes.TEXT,
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: "India",
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
      type: DataTypes.TEXT,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    paymentMethod: {
      type: DataTypes.TEXT,
      defaultValue: "Cash On Delivery",
    },
    product: {
      type: DataTypes.TEXT,
      get() {
        const data = this.getDataValue("product");
        return data ? JSON.parse(data) : [];
      },
      set(value) {
        this.setDataValue("product", JSON.stringify(value));
      },
    },
    total: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    toc: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.STRING,
    },
  });
  return Order;
};
