const express = require("express");
const router = express.Router();

const {
  getDash,
  customerProfile,
  updateProfileStatus,
  sellerProfile,
  getSellerProduct,
} = require("../controller/adminController");

router.route("/dashboard").get(getDash);
router.route("/customer/profile").get(customerProfile);
router.route("/customer/profile/:id").patch(updateProfileStatus);
router.route("/seller/profile").get(sellerProfile);
router.route("/seller/profile/:id").patch(updateProfileStatus);
router.route("/seller/products").get(getSellerProduct);

module.exports = router;
