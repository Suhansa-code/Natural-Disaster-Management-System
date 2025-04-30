import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../Utils/Cloudinary";

// Configure Multer Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "gurdianEarth", // Folder name in Cloudinary
    allowedFormats: ["jpg", "png", "jpeg"], // Allowed file types
  },
});

const upload = multer({ storage });

export default upload;
