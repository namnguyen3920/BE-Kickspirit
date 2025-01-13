const imgHosting = require("../services/imgHosting");

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
