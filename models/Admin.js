module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("admin", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Admin;
};
