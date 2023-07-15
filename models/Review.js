module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("review", {
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 99.99,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });
  return Review;
};
