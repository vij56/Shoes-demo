const dotenv = require("dotenv");
dotenv.config();

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: "localhost",
    logging: false,
    dialect: "mysql",
    pool: {
      max: 5, // Maximum number of connection in pool (default 5)
      min: 0, // Minimum number of connection in pool (default 0)
      acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error (default 60000)
      idle: 10000, // The maximum time, in milliseconds, that a connection can be idle before being released. (default 10000)
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./Product.js")(sequelize, DataTypes);
db.cart = require("./Cart.js")(sequelize, DataTypes);
db.order = require("./Order.js")(sequelize, DataTypes);
db.admin = require("./Admin.js")(sequelize, DataTypes);
db.advertize = require("./Advertize.js")(sequelize, DataTypes);
db.settings = require("./Settings.js")(sequelize, DataTypes);
db.category = require("./Category.js")(sequelize, DataTypes);
db.attributes = require("./Attributes.js")(sequelize, DataTypes);
db.pageContents = require("./PageContents.js")(sequelize, DataTypes);

db.products.hasOne(db.cart);
db.cart.belongsTo(db.products);

db.sequelize.sync().then(() => console.log("sync is done."));

module.exports = db;
