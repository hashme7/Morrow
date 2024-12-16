import mongoose from "mongoose";
import { IRepository } from "../interfaces/repository.interface";
import bcrypt from "bcryptjs";

export class ChangePassword {
  private readonly repository: IRepository;
  constructor(repository: IRepository) {
    this.repository = repository;
  }
  async execute(cpassword: string,newPassword:string, userId: mongoose.Types.ObjectId) {
    console.log(typeof cpassword,"cpassword")
    const user = await this.repository.getUser(userId);
    if(user){
      console.log("user is there...",user)
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(cpassword, 10);
        console.log(hashedPassword , user.password,'...............')
      console.log(await bcrypt.compare(cpassword,user.password))
    }
    if (!user || !(await bcrypt.compare(cpassword, user.password))) {
      console.log(`invalid credentials`)
      return {  
        status: 401,
        message: "invalid credentials OR user is not there",
        valid: false,
      };
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const udpatedUser = await this.repository.changePassword(userId,hashedPassword);
        return {
            status:200,
            message:"password changed successfully",
            data:udpatedUser,
        }
    }
  }
}
