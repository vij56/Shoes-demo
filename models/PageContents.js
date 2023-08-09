module.exports = (sequelize, DataTypes) => {
  const PageContent = sequelize.define("pageContent", {
    about_us: {
      type: DataTypes.TEXT("long"),
    },
    contact_us: {
      type: DataTypes.TEXT("long"),
    },
    acceptable_use_policy: {
      type: DataTypes.TEXT("long"),
    },
    faqs: {
      type: DataTypes.TEXT("long"),
    },
    disclaimer: {
      type: DataTypes.TEXT("long"),
    },
    return_refund_cancellection_shipping_policy: {
      type: DataTypes.TEXT("long"),
    },
    privacy_policy: {
      type: DataTypes.TEXT("long"),
    },
    terms_and_conditions: {
      type: DataTypes.TEXT("long"),
    },
    logo_path_name: {
      type: DataTypes.TEXT,
      get() {
        // When retrieving the value, parse the string to an array
        const data = this.getDataValue("image");
        return data ? JSON.parse(data) : [];
      },
      set(value) {
        // When setting the value, convert the array to a string
        this.setDataValue("image", JSON.stringify(value));
      },
    },
    brand_tagline: {
      type: DataTypes.TEXT("long"),
    },
    brand_favicon: {
      type: DataTypes.TEXT("long"),
    },
  });
  return PageContent;
};
