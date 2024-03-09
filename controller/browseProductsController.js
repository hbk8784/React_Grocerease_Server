const productsModel = require("../model/browseProductsModel");

const getProducts = async (req, res) => {
  // console.log(req.params);
  // console.log(new Date().getMinutes(), ":", new Date().getSeconds());
  try {
    const { mainCat, subCat, priceRange, brand, status, page, limit } =
      req.params;
    req.params.offset = (page - 1) * limit; //offset calculating and puting in params

    const row = await productsModel.get(req.params); // all results
    const row2 = await productsModel.productCount(req.params); // total product count

    const totalProduct = await row2;
    const totalPage = Math.ceil((await totalProduct) / limit);

    console.log(totalProduct);
    console.log(totalPage);

    res.status(200).json({
      products: row,
      mainCat,
      subCat,
      priceRange,
      brand,
      status,
      page,
      limit,
      totalPage,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = { getProducts };
