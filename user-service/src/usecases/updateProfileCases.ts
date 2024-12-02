import { IRepository } from "../interfaces/repository.interface";
import { IUpdateProfile } from "../interfaces/usecases.interface";
import {ObjectId} from 'mongodb';

export class UpdateProfile implements IUpdateProfile {
    
  constructor(private readonly repository: IRepository) {
    this.repository = repository;
  }
  async execute(userId: string, field: string, value: string) {
    try {
        const allowedFields = [
            "fullName",
            "username",
            "basedIn",
            "phone",
            "jobTitle",
          ];
      
          if (!allowedFields.includes(field)) {
            throw new Error(`Field "${field}" is not allowed for updates.`);
          }
          await this.repository.updateProfile(new ObjectId(userId),field,value);
          return {status:201,message:"update profile successfully"}
    } catch (error) {
        throw error;
    }
    
  }
}
