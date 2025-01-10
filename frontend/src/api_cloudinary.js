import axios from "axios";
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET_NAME = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_NAME;

const api = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}`,
});

export const cloudinaryUploadImage = async ({ file }) => {
  try {
    // https://cloudinary.com/documentation/image_upload_api_reference
    // requirements:
    // - formdata
    // - file
    // - upload_preset
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET_NAME);

    const response = await api.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
    throw error;
  }
};
