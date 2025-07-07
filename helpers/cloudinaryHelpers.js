import cloudinary from "../config/cloudinary.js";

async function uploadImage(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath);

    return {
      imageUrl: result.secure_url,
      imagePublicId: result.public_id,
    };
  } catch (error) {
    console.error("Error while uploading an image to cloudinary ->", error);
    throw new Error("Error while uploading an image to cloudinary");
  }
}

export { uploadImage };
