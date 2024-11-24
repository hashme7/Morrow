import { environmentVariables } from "morrow-common";
import { v2 as cloudinary } from "cloudinary";

export class Cloudinary {
  constructor() {
    cloudinary.config({
      cloud_name: environmentVariables.CLOUDINARY_NAME,
      api_key: environmentVariables.CLOUDINARY_APIKEY,
      api_secret: environmentVariables.CLOUDINARY_APISECRET,
    });
  }
  async uploadImage(filePath: string) {
    try {
      const uploadedImg = cloudinary.uploader.upload(
        filePath,
        { 
          upload_preset: "morrow-avatars",
          public_id: `avatar`,
          allowed_formats: ["jpg", "png", "jpeg", "svg", "ico", "webm"],
        },
        (error, result) => {
          if (error) {
            throw error;
          }
          console.log(result);
          return result;
        }
      );
      return uploadedImg;
    } catch (error) {
      console.log(`Error on uploading image to cloudinary :${error}`);
      throw new Error(`Cloudinary upload failed: ${error}`);
    }
  }
}

