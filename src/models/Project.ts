import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
    },
    technologies: {
      type: [String],
      required: [true],
    },
    projectUrl: {
      type: String,
      required: [true, "Project Url is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imagePublicId: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Project = model("Project", ProjectSchema);

export { Project };
