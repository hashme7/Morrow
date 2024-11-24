import {Types} from "mongoose";
import { IRepository } from "../interfaces/repository.interface";
import { CloudinaryUploadResponse, ICloudinary } from "../interfaces/cloudinary.interface";



export class UpdateImage {
    constructor(private readonly repository:IRepository,private readonly cloudinary:ICloudinary){
        this.repository = repository;
        this.cloudinary = cloudinary;
    }
    async execute(img:string,userId:Types.ObjectId){
        try {
            const uploadedImg:CloudinaryUploadResponse = await this.cloudinary.uploadImage(img);
            const updatedUser = await this.repository.updateImage(uploadedImg.public_id,userId);
            if(updatedUser ){
                return {status:204,data:updatedUser,message:'image updated succesfully'}
            }else{
                return {status:404,message:"user not found"};
            }
        } catch (error) {
            console.log(`Error on udpate image usecases ${error}`);
            throw new Error(`Error on udpate image usecases ${error}`);
        }
    }
}