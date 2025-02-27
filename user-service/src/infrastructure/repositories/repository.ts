import User from "../../entities_models/userModel";
import Team from "../../entities_models/teamModel";
import VerificationCode from "../../entities_models/verificationCodeModel";
import { IRepository } from "../../interfaces/repository.interface";
import { IOtp } from "../../interfaces/types/otp.interface";
import { IRequest, ITeam, IUser } from "../../interfaces/types/user";
import { IAddTeamMessage, IRole } from "../../interfaces/types/response";
import mongoose, { ObjectId, Types } from "mongoose";
import TeamMember from "../../entities_models/teamMemberModel";
import Requests from '../../entities_models/requestModal';
import Roles from '../../entities_models/roleModal'

class Repository implements IRepository {
  constructor() {
    console.log("repository initialized");
  }
  async getRolesByTeamId(teamId: mongoose.Types.ObjectId): Promise<IRole[]> {
    try {
      return await Roles.find({ team_id: teamId });
    } catch (error) {
      throw error;
    }
  }
  async changeRole(
    userId: mongoose.Types.ObjectId,
    teamId: mongoose.Types.ObjectId,
    role: "Developer" | "TeamLead" | "ProjectManager"
  ): Promise<IRole> {
    try {
      const updatingRole = await Roles.findOne({
        team_id: teamId,
        user_account: userId,
      });
      if (!updatingRole) throw new Error("given role is not found..");
      updatingRole.role = role;
      return (await updatingRole.save()).toObject();
    } catch (error) {
      throw error;
    }
  }
  async deleteRequest(requestId: mongoose.Types.ObjectId): Promise<void> {
    try {
      await Requests.deleteOne({ _id: requestId });
      console.log("deleted......");
    } catch (error) {
      throw error;
    }
  }

  async getRequests(userId: mongoose.Types.ObjectId): Promise<IRequest[]> {
    try {
      return await Requests.find({ user_account: userId });
    } catch (error) {
      throw error;
    }
  }
  async markUserAsVerified(userId: ObjectId): Promise<void> {
    try {
      await User.updateOne({ _id: userId }, { $set: { isVerified: true } });
    } catch (error) {
      console.error(`Error marking user as verified: ${error}`);
      throw error;
    }
  }

  async addRole(
    userId: mongoose.Types.ObjectId,
    teamId: mongoose.Types.ObjectId,
    role: "Developer" | "TeamLead" | "ProjectManager"
  ) {
    try {
      const newRole = await Roles.create({
        user_account: userId,
        team_id: teamId,
        role,
      });
      return (await newRole.save()).toObject();
    } catch (error) {
      console.log(`error on adding role ${error}`);
      throw error;
    }
  }

  async verifyOtp(userId: ObjectId, code: number): Promise<boolean> {
    try {
      const otpRecord = await VerificationCode.findOne({ user: userId }).sort({
        _id: -1,
      });
      if (!otpRecord) return false;
      const isOtpValid = otpRecord.code == code;
      return isOtpValid;
    } catch (error) {
      console.error(`Error verifying OTP: ${error}`);
      throw error;
    }
  }
  async saveOtp(
    userId: mongoose.Types.ObjectId,
    verificationCode: number
  ): Promise<IOtp> {
    try {
      const otp = new VerificationCode({
        user: userId,
        code: verificationCode,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      });
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
  async findUsersByIds(membersId: string[]) {
    try {
      const users = await User.find({
        _id: { $in: membersId },
      }).lean();
      return users;
    } catch (error) {
      console.log(`Error on finding users by ids : ${error}`);
      throw error;
    }
  }
  async changeEmail(userId: mongoose.Types.ObjectId, email: string) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { email: email } },
        { lean: true }
      );
      return updatedUser;
    } catch (error) {
      console.log(`Error on updating Email : ${error}`);
      throw error;
    }
  }
  async getTeamIdsByUserId(userId: mongoose.Types.ObjectId): Promise<string[]> {
    try {
      const teamIds = await TeamMember.find(
        { user_account: userId },
        { team_id: 1, _id: 0 }
      ).exec();
      const teamIdsList = teamIds.map((team) => team.team_id.toString());
      return teamIdsList;
    } catch (error) {
      console.log(`error on finding teamIds:${error}`);
      // throw error;
      return [];
    }
  }
  async getTeamIdByProject(
    projectId: number
  ): Promise<mongoose.Types.ObjectId | null> {
    try {
      const teamId = await Team.findOne(
        { projectId: projectId },
        { _id: 1 }
      ).exec();
      return teamId ? teamId._id : null;
    } catch (error) {
      console.log(`Error on getTeamIdByProjectId :${error}`);
      throw error;
    }
  }
  async getTeamMembers(teamId: mongoose.Types.ObjectId) {
    try {
      const teamMembers = await TeamMember.find(
        { team_id: teamId },
        { user_account: 1, _id: 0 }
      ).exec();
      const userIds = teamMembers.map((member) => String(member.user_account));
      return userIds;
    } catch (error) {
      console.log(`Error on get team members : ${error}`);
      throw error;
    }
  }
  async addTeamMembers(
    userId: mongoose.Types.ObjectId,
    teamId: mongoose.Types.ObjectId
  ) {
    try {
      const newMember = new TeamMember({
        user_account: userId,
        team_id: teamId,
      });
      await newMember.save();
      return newMember;
    } catch (error) {
      console.log(`Error on repository (addTeam Members...) . Error: ${error}`);
      throw error;
    }
  }
  async createTeam(data: IAddTeamMessage): Promise<ITeam> {
    try {
      console.log(
        data.projectId,
        data.projectName,
        "create Team in repositioryyy................"
      );
      const newTeam = new Team({
        name: data.projectName,
        projectId: data.projectId,
      });
      await newTeam.save();
      return newTeam;
    } catch (error) {
      console.log(`Error on create Team error: ${error}`);
      throw error;
    }
  }
  async updateImage(
    img: string,
    userId: mongoose.Types.ObjectId
  ): Promise<IUser | null> {
    try {
      const updatedImg = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { image: img } },
        { new: true, lean: true }
      );
      return updatedImg;
    } catch (error) {
      console.log(`Error on uploading the image ...`);
      throw error;
    }
  }

  async getUser(userId: mongoose.Types.ObjectId): Promise<IUser | null> {
    const user = await User.findOne({ _id: userId });
    return user;
  }
  async countAllUsers() {
    return await User.countDocuments();
  }
  async findAllUsers(offset: number, limit: number) {
    try {
      const data = await User.find({}).skip(offset).limit(limit);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createRequest(
    teamId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    note: string
  ): Promise<IRequest> {
    try {
      const newRequest = new Requests({
        team_id: teamId,
        user_account: userId,
        note: note,
      });
      return (await newRequest.save()).toObject();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getRequest(userId: mongoose.Types.ObjectId) {
    try {
      const RequestData = await Requests.find({ user_account: userId });
      console.log(RequestData, "fkjaksjdfkasjkdfjaksdfjkasdjfk;asf");
      return RequestData;
    } catch (error) {
      console.log(`errror on get request
      ${error}
      
      `);
      throw error;
    }
  }

  async changePassword(userId: mongoose.Types.ObjectId, newPassword: string) {
    const user = await this.getUser(userId);
    if (user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { password: newPassword } },
        { new: true, lean: true }
      );
      return updatedUser;
    }
    return null;
  }
  async updateProfile(
    userId: mongoose.Types.ObjectId,
    field: string,
    value: string
  ) {
    const updateData: { [key: string]: any } = {};
    updateData[field] = value;
    const result = await User.updateOne({ _id: userId }, { $set: updateData });
    if (result.modifiedCount === 0) {
      throw new Error(
        "No changes made. User not found or field value is the same."
      );
    }
    return;
  }
  async getRole(teamId: string, userId: string) {
    try {
      return await Roles.findOne({
        team_id: new Types.ObjectId(teamId),
        user_account: new Types.ObjectId(userId),
      }).lean();
    } catch (error) {
      throw error;
    }
  }
}

export default Repository;
