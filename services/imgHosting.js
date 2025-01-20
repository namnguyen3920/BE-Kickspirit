const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const options = {
      folder: folder || "Product",
    };

    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        console.error("Cloudinary Upload Error:", error);
        return reject(error);
      }
      console.log("Cloudinary Upload Success:", result.secure_url);
      resolve(result.secure_url);
    });

    const { Readable } = require("stream");
    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null);
    readableStream.pipe(stream);
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
            return [];
          }
      return resources.map((file) => file.secure_url);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
