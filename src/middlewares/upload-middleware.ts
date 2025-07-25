import { Request } from "express";
import fs from "fs";
import multer, { FileFilterCallback } from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) {
    const dirPath = "uploads/";

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    cb(null, dirPath);
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: FilenameCallback
  ) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// File filter function
function checkFileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image. Please only uploads images!"));
  }
}

// Multer middleware
const multerMiddleware = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB File size limit
  },
});

export default multerMiddleware;
