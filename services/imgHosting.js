const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadToCloudinary = (fileStream, folder) => {
  return new Promise((resolve, reject) => {
    const options = {
      folder: folder || "product",
    };

    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result.secure_url);
    });

    fileStream.pipe(stream);
  });
};

exports.fetchBannersImages = async (folder) => {
    try {
        const result = await cloudinary.api.root_folders();
        console.log("Folders:", result.folders);
      const { resources } = await cloudinary.search
        .expression(`folder:${folder}`)
        .sort_by("public_id", "desc")
        .execute();
        if (!resources || resources.length === 0) {
            console.warn(`No images found in folder: ${folder}`);
            return []; // Trả về mảng rỗng nếu không có ảnh
          }
      return resources.map((file) => file.secure_url);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
