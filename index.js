const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");

require("./models/index.js");

const app = express();

const productRouter = require("./routes/productRoutes.js");
const cartRouter = require("./routes/cartRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");
const adminRouter = require("./routes/adminRoutes.js");
const advertizeRouter = require("./routes/advertizeRoutes.js");

const corsOptions = {
  origin: "https://shoes-website-admin-r6cea3ezw-pavantank7016.vercel.app/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", productRouter, cartRouter, orderRouter);
app.use("/api/admin", adminRouter, advertizeRouter);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World!" });
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
