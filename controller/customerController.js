const customerModel = require("../model/customerModel");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const getProfile = (req, res) => {
  console.log(req.user);
  customerModel.profile();
  res.status(200).json({ message: "user profile" });
};

const updateProfile = async (req, res) => {
  try {
    const [userData] = await customerModel.updateProfile(req.body);
    const { id, firstName, lastName, role, active } = userData[0];
    const { gender, dob, email, phone, address } = userData[0];
    const { userName, created_on, updated_on } = userData[0];

    const cwCount = await userModel.itemCount(id);
    const token = jwt.sign({ id, role }, process.env.JWT_STRING, {
      expiresIn: "1d",
    });
    const data = {
      id,
      firstName,
      lastName,
      role,
      active,
      gender,
      dob,
      email,
      phone,
      address,
      userName,
      created_on,
      updated_on,
      cwCount,
      token,
    };
    res.status(200).json({ message: "profile updated", user: data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrders = (req, res) => {
  console.log(req.user);
  customerModel.orders();
  res.status(200).json({ message: "your orders" });
};

const makeOrders = (req, res) => {
  console.log(req.user);
  customerModel.makeOrders();
  res.status(200).json({ message: "order placed" });
};

const trackOrders = (req, res) => {
  console.log(req.user);
  customerModel.trackOrders();
  res.status(200).json({ message: "tracking orders" });
};

const getWishList = (req, res) => {
  console.log(req.user);
  customerModel.getWishList();
  res.status(200).json({ message: "your wishlist" });
};

const addToWishList = (req, res) => {
  console.log(req.user);
  customerModel.addToWishList();
  res.status(200).json({ message: "item added to wishlist" });
};

const removeFromWishList = (req, res) => {
  console.log(req.user);
  customerModel.removeFromWishList();
  res.status(200).json({ message: "item removed from  wishlist" });
};

const getCart = (req, res) => {
  console.log(req.user);
  customerModel.getCart();
  res.status(200).json({ message: "cart items" });
};

const addToCart = (req, res) => {
  console.log(req.user);
  customerModel.addToCart();
  res.status(200).json({ message: "item added to cart" });
};

const removeFromCart = (req, res) => {
  console.log(req.user);
  customerModel.removeFromCart();
  res.status(200).json({ message: "item removed from  cart" });
};

const getInvoice = (req, res) => {
  console.log(req.user);
  customerModel.getInvoice();
  res.status(200).json({ message: "user invoice" });
};

const getMessage = (req, res) => {
  console.log(req.user);
  customerModel.getMessage();
  res.status(200).json({ message: "show all messages" });
};

const sendMessages = (req, res) => {
  console.log(req.user);
  customerModel.statusMessages();
  res.status(200).json({ message: "message status to seller" });
};

module.exports = {
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
};
