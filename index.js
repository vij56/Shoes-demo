const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

require("./models/index.js");

const app = express();
dotenv.config();

const productRouter = require("./routes/productRoutes.js");
const cartRouter = require("./routes/cartRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");
// const reviewRouter = require("./routes/reviewRoutes.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", productRouter, cartRouter, orderRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
