const adminModel = require("../model/adminModel");

const getDash = (req, res) => {
  console.log(req.user);
  adminModel.getDash();
  res.status(200).json({ message: "home dash Data" });
};

const customerProfile = (req, res) => {
  console.log(req.user);
  adminModel.customerProfile();
  res.status(200).json({ message: "customer profile details" });
};

const updateProfileStatus = (req, res) => {
  console.log(req.user);
  adminModel.updateProfileStatus();
  res.status(200).json({ message: "updating customer status" });
};

const sellerProfile = (req, res) => {
  console.log(req.user);
  adminModel.sellerProfile();
  res.status(200).json({ message: "admin viewing seller profile" });
};

const getSellerProduct = (req, res) => {
  console.log(req.user);
  adminModel.getSellerProduct();
  res.status(200).json({ message: "getting all products by seller" });
};

module.exports = {
  getDash,
  customerProfile,
  updateProfileStatus,
  sellerProfile,
  getSellerProduct,
};
