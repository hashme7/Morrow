import User from "../../entities_models/userModel";
import Team from "../../entities_models/teamModel";
import VerificationCode from "../../entities_models/verificationCodeModel";
import { IRepository } from "../../interfaces/repository.interface";
import { IOtp } from "../../interfaces/types/otp.interface";
import { ITeam, IUser } from "../../interfaces/types/user";
import { IAddTeamMessage } from "../../interfaces/types/response";
import { ObjectId } from "mongoose";
import { ObjectId as newObjectId } from "mongodb";


class Repository implements IRepository {
  constructor() {
    console.log("repository initialized");
  }
  async markUserAsVerified(userId: ObjectId): Promise<void> {
    try {
      await User.updateOne({ _id: userId }, { $set: { isVerified: true } });
    } catch (error) {
      console.error(`Error marking user as verified: ${error}`);
      throw error;
    }
  }
  async updateFullName(name:string,userId:ObjectId):Promise<IUser | null>{
    try{
      const user = await User.findOneAndUpdate({_id:userId},{$set:{fullName:name}},{new:true});
      console.log(user)
      if(!user)return null;
      return user;
    }catch(error){
      console.error(`Error on updating the `)
      throw error;
    }
  }
  async verifyOtp(userId: ObjectId, code: number): Promise<boolean> {
    try {
      const otpRecord = await VerificationCode.findOne({ user: userId }).sort({_id:-1});
      if (!otpRecord) return false;
      const isOtpValid = otpRecord.code == code ;
      return isOtpValid;
    } catch (error) {
      console.error(`Error verifying OTP: ${error}`);
      throw error;
    }
  }
  async saveOtp(userId: ObjectId, verificationCode: number): Promise<IOtp> {
    try {
        const otp = new VerificationCode({ user: userId, code: verificationCode,expiresAt:new Date(Date.now() + 5 * 60 * 1000) });
        const savedOtp = await otp.save();  
        return savedOtp as unknown as IOtp;  
    } catch (error) {
        console.log(`Error saving OTP: ${error}`);
        throw error;
    }
}
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      return (await User.findOne({ email: email })) as IUser;
    } catch (error) {
      console.log(`error on finding by email on user: ${error}`);
      throw error;
    }
  }
  async insertOne(userData: IUser): Promise<IUser> {
    try {
      const filter = { email: userData.email };
      const update = { $set: userData };
      const options = { upsert: true, new: true }; 
      
      const newUser = await User.findOneAndUpdate(filter, update, options);
      return newUser as unknown as IUser;
    } catch (error) {
      console.log(`Error on inserting user: ${error}`);
      throw error;
    }
  }
  async createTeam(data:IAddTeamMessage):Promise<ITeam>{
    console.log(data.projectId,data.projectName,data.teamId)

    const newTeam =new Team({
      _id:new newObjectId(data.teamId),
      name:data.projectName,
      projectId:data.projectId,
    })
    await newTeam.save();
    return newTeam;
  }
}

export default Repository;
