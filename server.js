const express = require("express");
const app = express();
require("dotenv").config();
const auth = require("./middleware/userAuthMiddleware");
const cors = require("cors");

const onLoad = require("./routes/onLoadRoute");
const userRoute = require("./routes/userRoute");
const browseProductsRoute = require("./routes/browseProductsRoute");
const adminRoute = require("./routes/adminRoute");
const customerRoute = require("./routes/customerRoute");
const sellerRoute = require("./routes/sellerRoute");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

//common routes || no authentication needed
app.use("/api/v1/onLoad", onLoad);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/products", browseProductsRoute);

// app.use(auth); //applied to all the routes down below
//secured routes
app.use("/api/v1/admin", auth, adminRoute);
app.use("/api/v1/customer", auth, customerRoute);
app.use("/api/v1/seller", auth, sellerRoute);

app.listen(process.env.PORT, () => {
  console.log("server listning on port ", process.env.PORT);
});
