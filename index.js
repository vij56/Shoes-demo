const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");

require("./models/index.js");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const productRouter = require("./routes/productRoutes.js");
const cartRouter = require("./routes/cartRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");
const adminRouter = require("./routes/adminRoutes.js");
const advertizeRouter = require("./routes/advertizeRoutes.js");
const settingsRouter = require("./routes/settingRoutes.js");
const categoryRouter = require("./routes/categoryRoutes.js");
const attributesRouter = require("./routes/attributesRoutes.js");

app.use("/api", productRouter, cartRouter, orderRouter);
app.use(
  "/api/admin",
  adminRouter,
  advertizeRouter,
  settingsRouter,
  categoryRouter,
  attributesRouter
);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World!" });
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
