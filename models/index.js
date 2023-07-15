const dotenv = require("dotenv");
dotenv.config();

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("shoesdemo", "root", process.env.PASSWORD, {
  host: "localhost",
  // logging: false, // turn of showing logs in terminal everytime app restart/reload
  dialect: "mysql", // The dialect of the database you are connecting to. One of mysql, postgres, sqlite, db2, mariadb and mssql.
  pool: {
    max: 5, // Maximum number of connection in pool (default 5)
    min: 0, // Minimum number of connection in pool (default 0)
    acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error (default 60000)
    idle: 10000, // The maximum time, in milliseconds, that a connection can be idle before being released. (default 10000)
  },
});

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch(err => console.error("Unable to connect to the database:", err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./Product.js")(sequelize, DataTypes);
// db.reviews = require("./Review.js")(sequelize, DataTypes);
db.cart = require("./Cart.js")(sequelize, DataTypes);
db.order = require("./Order.js")(sequelize, DataTypes);

db.products.hasOne(db.cart);
db.cart.belongsTo(db.products);

// one to many relationship
// db.products.hasMany(db.reviews, {
//   foreignKey: "product_id",
//   as: "review",
// });

db.sequelize
  .sync({ force: true })
  // .then(() => {
  //   return db.order.findOne({ where: { id: 1 } });
  // })
  // .then(order => {
  //   if (!order) {
  //     return db.order.create({
  //       firstName: "first name",
  //       lastName: "last name",
  //       companyName: "company name",
  //       streetAddress: "street address",
  //       city: "surat",
  //       state: "gujarat",
  //       pinCode: 395004,
  //       phoneNumber: 1234567890,
  //       emailAddress: "dummy@gmail.com",
  //       notes: "dummy notes",
  //     });
  //   }
  //   return order;
  // })
  // .then(order => {
  //   console.log(order);
  // })
  .then(() => console.log("sync is done."));

module.exports = db;
