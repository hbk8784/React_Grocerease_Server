const pool = require("../db/connection");

const adminModel = {
  getDash: function () {
    console.log("query for dash");
  },
  customerProfile: function () {
    console.log("query for customer profile");
  },

  updateProfileStatus: function () {
    console.log("query for updatin profile status");
  },
  sellerProfile: function () {
    console.log("query for seller profile");
  },
  getSellerProduct: function () {
    console.log("query for getting seller products");
  },
};

module.exports = adminModel;
