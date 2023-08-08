module.exports = (sequelize, DataTypes) => {
  const PageContent = sequelize.define("pageContent", {
    about_us: {
      type: DataTypes.TEXT("long"),
    },
    contact_us: {
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
      type: DataTypes.TEXT("long"),
    },
  });
  return PageContent;
};
