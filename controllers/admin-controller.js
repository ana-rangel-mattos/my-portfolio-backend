import fs from "fs";
import { uploadImage } from "../helpers/cloudinaryHelpers.js";
import { Project } from "../models/Project.js";

async function postNewProject(req, res) {
  try {
    // If there is no image
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "File is required. Please upload an image.",
      });
    }

    // Upload to cloudinary
    const { imageUrl, imagePublicId } = await uploadImage(req.file.path);

    const { name, description, technologies, projectUrl } = req.body;

    // Create new Project
    const newProject = await Project.create({
      imageUrl,
      imagePublicId,
      projectUrl,
      name,
      description,
      technologies,
    });

    fs.unlinkSync(file.req.path);

    req.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: newProject,
    });
  } catch (error) {
    console.error("Something went wrong ->", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
}

export { postNewProject };
