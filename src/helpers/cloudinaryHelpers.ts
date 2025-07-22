import cloudinary from "../config/cloudinary.js";

async function uploadImage(filePath: string) {
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

async function deleteImageFromCloud(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
  } catch (error) {
    console.error("Error while deleting an image from cloudinary ->", error);
    throw new Error("Error while deleting an image from cloudinary");
  }
}

export { deleteImageFromCloud, uploadImage };
