import { v2 as cloudinary } from "cloudinary";
import { Response } from "express";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadToCloud = async (file: any, res: Response) => {
  try {
    const profilePicture = await cloudinary.uploader.upload(file.path, {
      folder: "my-brand",
      use_filename: true,
    });
    return profilePicture;
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: "Fail to upload image",
      error: error.message,
    });
  }
};
