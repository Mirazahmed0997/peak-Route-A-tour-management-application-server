import { v2 as cloudinary} from "cloudinary";
import { envVars } from "./env";
// import multer from "multer";



cloudinary.config({
    cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: envVars.CLOUDINARY.CLOUDINARY_API_KEY,
    api_secret: envVars.CLOUDINARY.CLOUDINARY_API_SECRET
})

// using multer storage cloudunary

export const cloudinaryUpload= cloudinary