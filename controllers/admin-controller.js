import fs from "fs";
import {
  deleteImageFromCloud,
  uploadImage,
} from "../helpers/cloudinaryHelpers.js";
import { Project } from "../models/Project.js";

async function postNewProject(req, res) {
  try {
    // If there is no image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required. Please upload an image.",
      });
    }

    // Upload to cloudinary
    const { imageUrl, imagePublicId } = await uploadImage(req.file.path);

    const { name, description, technologies, projectUrl } = req.body;

    // Create new Project
    const newProject = await Project.create({
      name,
      description,
      technologies: JSON.parse(technologies),
      imageUrl,
      imagePublicId,
      projectUrl,
      uploadedBy: req.userInfo.userId,
    });

    fs.unlinkSync(req.file.path);

    res.status(201).json({
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

async function deleteProjectById(req, res) {
  try {
    // Check if prject exists
    const { projectId } = req.params;

    const foundProject = await Project.findById(projectId);

    if (!foundProject) {
      return res.status(404).json({
        success: false,
        message: `Project ${projectId} could not be found. Please try again with valid data.`,
      });
    }

    // Delete the project image from cloudinary
    await deleteImageFromCloud(foundProject.imagePublicId);

    // Delete project from MongoDB
    await foundProject.deleteOne();

    // Check if it is deleted
    const deletedProject = await Project.findById(foundProject._id);

    // Project was deleted
    if (!deletedProject) {
      return res.status(204).json({
        success: true,
        message: "Project deleted successfully.",
      });
    }

    // Project was not deleted
    return res.status(409).json({
      success: false,
      message: "Project could not be deleted. Please try again.",
    });
  } catch (error) {
    console.error("Something went wrong ->", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
}

export { deleteProjectById, postNewProject };
