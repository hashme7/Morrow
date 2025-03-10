import mongoose, { ObjectId } from "mongoose";
import { IRequest, ITeam, IUser } from "../types/user";
import { IAddMember, IAddTeamMessage, IRole } from "../types/response";

export interface IRepository {
  deleteRequest(requestId: mongoose.Types.ObjectId): Promise<void>;
  markUserAsVerified(userId: ObjectId): Promise<void>;
  verifyOtp(userId: ObjectId, otp: number): unknown;
  saveOtp(
    id: mongoose.Types.ObjectId | undefined,
    verificationCode: number
  ): unknown;
  findByEmail(email: string): Promise<IUser | null>;
  insertOne(userData: IUser): Promise<IUser>;
  createTeam(data: IAddTeamMessage): Promise<ITeam | null>;
  getUser(userId: mongoose.Types.ObjectId): Promise<IUser | null>;
  changePassword(
    userId: mongoose.Types.ObjectId,
    newPassword: string
  ): Promise<IUser | null>;

  changeEmail(
    userId: mongoose.Types.ObjectId,
    email: string
  ): Promise<IUser | null>;
  getTeamIdsByUserId(userId: mongoose.Types.ObjectId): Promise<string[]>;
  addTeamMembers(
    userId: mongoose.Types.ObjectId,
    teamId: mongoose.Types.ObjectId
  ): Promise<IAddMember>;
  getTeamIdByProject(
    projectId: number
  ): Promise<mongoose.Types.ObjectId | null>;
  getTeamMembers(teamId: mongoose.Types.ObjectId): Promise<string[]>;
  findUsersByIds(
    membersId: string[],
    page: number,
    limit: number
  ): Promise<IUser[]>;
  updateImage(
    img: string,
    userId: mongoose.Types.ObjectId
  ): Promise<IUser | null>;
  findAllUsers(offset: number, limit: number): Promise<IUser[]>;
  countAllUsers(): Promise<number>;
  createRequest(
    teamId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    note: string
  ): Promise<IRequest>;
  getRequests(userId: mongoose.Types.ObjectId): Promise<IRequest[]>;
  updateProfile(
    userId: mongoose.Types.ObjectId,
    field: string,
    value: string
  ): Promise<void>;
  addRole(
    userId: mongoose.Types.ObjectId,
    teamId: mongoose.Types.ObjectId,
    role: string
  ): Promise<IRole>;
  changeRole(
    userId: mongoose.Types.ObjectId,
    teamId: mongoose.Types.ObjectId,
    role: string
  ): Promise<IRole>;
  getRolesByTeamId(teamId: mongoose.Types.ObjectId): Promise<IRole[]>;
  getRole(teamId: string, userId: string): Promise<IRole | null>;
}
