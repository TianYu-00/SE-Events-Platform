const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.deleteImage = async (imageSecureURL) => {
  try {
    // console.log("secure link", imageSecureURL);
    const publicId = imageSecureURL.split("/").slice(-1)[0].split(".")[0];
    // console.log("public id", publicId);
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

exports.deleteMultipleImages = async (imageSecureURLs) => {
  try {
    // console.log("secure links", imageSecureURLs);
    const publicIds = imageSecureURLs.map((imageSecureURL) => {
      return imageSecureURL.split("/").slice(-1)[0].split(".")[0];
    });
    // console.log("public id", publicIds);
    const response = await cloudinary.api.delete_resources(publicIds);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error bulk deleting images:", error);
  }
};
