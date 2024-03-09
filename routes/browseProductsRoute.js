const express = require("express");
const router = express.Router();
const { getProducts } = require("../controller/browseProductsController");

router
  .route("/:mainCat/:subCat/:priceRange/:brand/:status/:page/:limit/")
  .get(getProducts);

module.exports = router;
