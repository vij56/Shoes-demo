const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
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
    trackingId: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      //note here this is the guy that you are looking for
      get() {
        return moment(this.getDataValue("createdAt")).format(
          "YYYY/MM/DD hh:mm:ss"
        );
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue("updatedAt")).format(
          "YYYY/MM/DD hh:mm:ss"
        );
      },
    },
  });
  return Order;
};
