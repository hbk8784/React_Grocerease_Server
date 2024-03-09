const homeModel = require("../model/homeModel");

const onLoad = async (req, res) => {
  try {
    const row = await homeModel.getHome();
    const { hero, best } = row;
    res.status(200).json({ hero, best });
  } catch (error) {}
};

module.exports = onLoad;
