const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerMiddleware");
const {
  getDashboard,
  getOrders,
  getProducts,
  addProducts,
  updateProduct,
  deleteProduct,
} = require("../controller/sellerController");

router.route("/dashboard").get(getDashboard);
router.route("/orders").get(getOrders);
router
  .route("/product/:search/:page/:limit")
  .get(getProducts)
  .post(upload.single("image"), addProducts);
router.route("/product/:id").patch(updateProduct).delete(deleteProduct);
router.route("/view/payment").get();
router.route("/view/customers").get();
router.route("/invoice").get();
router.route("/order/status/update/:id").patch();

module.exports = router;
