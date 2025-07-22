import { Request, Response } from "express";
import fs from "fs";
import {
  deleteImageFromCloud,
  uploadImage,
} from "../helpers/cloudinaryHelpers.js";
import { Project } from "../models/Project.js";
import { User } from "../models/User.js";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

interface FetchRequest extends Request {
  query: {
    page: string;
    limit: string;
    techs?: string;
    sortBy?: "createdAt" | "updatedAt" | "name" | "description";
    sortByOrder?: "asc" | "desc";
  };
}

async function postNewProject(req: MulterRequest, res: Response) {
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

async function deleteProjectById(req: Request, res: Response) {
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

async function fetchProjectsByUserId(req: FetchRequest, res: Response) {
  try {
    const admin = await User.findOne({});

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "No user was found.",
      });
    }

    const userId = admin._id;

    const { techs } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || "createdAt";
    const sortByOrder = req.query.sortByOrder === "asc" ? 1 : -1;

    const query = {
      uploadedBy: userId,
      technologies: {},
    };

    if (techs && techs.length > 0) {
      const techsArray = techs.split(",");
      query.technologies = { $in: techsArray };
    }

    const totalProjects = await Project.find(query).countDocuments();

    const totalPages = Math.ceil(totalProjects / limit);

    const sortStr = `${sortByOrder === 1 ? "" : "-"}${sortBy}`;

    const projects = await Project.find(query)
      .sort(sortStr)
      .skip(skip)
      .limit(limit);

    if (!projects) {
      return res.status(400).json({
        success: false,
        message: "This user has not uploaded any project.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched user projects.",
      currentPage: page,
      totalPages,
      totalProjects,
      data: projects,
    });
  } catch (error) {
    console.error("Something went wrong ->", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
}

export { deleteProjectById, fetchProjectsByUserId, postNewProject };
