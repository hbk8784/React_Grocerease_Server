const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getOrders,
  makeOrders,
  trackOrders,
  getWishList,
  addToWishList,
  removeFromWishList,
  getCart,
  addToCart,
  removeFromCart,
  getInvoice,
  getMessage,
  sendMessages,
} = require("../controller/customerController");

router.route("/profile").get(getProfile).patch(updateProfile);
router.route("/order/").get(getOrders).post(makeOrders);
router.route("/order/:id").get(trackOrders);
router.route("/wishlist").get(getWishList);
router.route("/wishlist/:id").post(addToWishList).delete(removeFromWishList);
router.route("/cart/:id").post(addToCart).delete(removeFromCart);
router.route("/cart").get(getCart);
router.route("/invoice/:id").get(getInvoice);
router.route("/message").get(getMessage);
router.route("/message/:id").post(sendMessages);

module.exports = router;
