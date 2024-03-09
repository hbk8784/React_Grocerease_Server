const sellerModel = require("../model/sellerModel");

const getDashboard = (req, res) => {
  console.log(req.user);
  sellerModel.getDashboard();
  res.status(200).json({ message: "getting seller dashboard" });
};

const getOrders = (req, res) => {
  res.status(200).json({ message: "getting orders for sellers" });
};

const getProducts = async (req, res) => {
  try {
    const page = req.params.page;
    const offSet = (page - 1) * req.params.limit;
    let totalPage;

    const pcount = await sellerModel.productCount(req.user);
    const row = await sellerModel.getProducts(
      req.params.search,
      req.user.id,
      +req.params.limit,
      offSet
    );

    if (req.params.search == "all") {
      totalPage = pcount.allCount / +req.params.limit;
    } else if (req.params.search == "in stock") {
      totalPage = pcount.inStockCount / +req.params.limit;
    } else {
      totalPage = pcount.outStockCount / +req.params.limit;
    }

    res.status(200).json({ products: row, pcount, totalPage, page });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const addProducts = async (req, res) => {
  try {
    await sellerModel.addProducts({ ...req.body, image: req.file.filename });
    res.status(200).json({ message: "Product added" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = (req, res) => {
  res.status(200).json({ messsage: "updating products" });
};

const deleteProduct = (req, res) => {
  res.status(200).json({ message: "delete selected product" });
};

module.exports = {
  getDashboard,
  getOrders,
  getProducts,
  addProducts,
  updateProduct,
  deleteProduct,
};
