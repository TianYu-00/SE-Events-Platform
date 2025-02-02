const cloudinary = require("cloudinary").v2;
// https://cloudinary.com/documentation/node_integration
// https://cloudinary.com/documentation/deleting_assets_tutorial

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.deleteImage = async (imageSecureURL) => {
  try {
    const publicId = imageSecureURL.split("/").slice(-1)[0].split(".")[0];

    const tagsResponse = await cloudinary.api.resource(publicId, { tags: true });

    if (tagsResponse.tags.includes("test")) {
      return { result: "skipped" };
    }

    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

exports.deleteMultipleImages = async (imageSecureURLs) => {
  try {
    const imageTagsPromises = imageSecureURLs.map(async (imageSecureURL) => {
      const publicId = imageSecureURL.split("/").slice(-1)[0].split(".")[0];
      const tagsResponse = await cloudinary.api.resource(publicId, { tags: true });
      return {
        publicId,
        isTestImage: tagsResponse.tags.includes("test"),
      };
    });

    const imageTags = await Promise.all(imageTagsPromises);

    const publicIdsToDelete = imageTags.filter((image) => !image.isTestImage).map((image) => image.publicId);

    if (publicIdsToDelete.length > 0) {
      const response = await cloudinary.api.delete_resources(publicIdsToDelete);
      console.log(response);
      return response;
    } else {
      console.log("No images were deleted.");
    }
  } catch (error) {
    console.error("Error bulk deleting images:", error);
  }
};
