const imgHosting = require("../services/imgHosting");
const sizeModels = require("../models/sizeModels")
exports.getBannersImages = async (req, res) => {
  try {
    const folder = "Banner";
    
    const images = await imgHosting.fetchBannersImages(folder);

    res.status(200).json(images);
  } catch (error) {
    console.error("Error in getBannersImages:", error.message);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

exports.getSize = async(req, res) => {
  try {
    const result = await sizeModels.getSize();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching', message: err.message });
  }
}