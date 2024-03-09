const express = require("express");
const router = express.Router();
const onLoad = require("../controller/onLoadController");

router.route("/").get(onLoad);

module.exports = router;
