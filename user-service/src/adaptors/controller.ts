import mongoose from "mongoose";
import {
  IChangeEmailCases,
  IChangePasswordCases,
  ICreateRequest,
  IGetAllUsers,
  IGetRequests,
  IGetTeamMembers,
  IGetUserCases,
  IJoinProject,
  IRejectRequest,
  IUpdateImg,
  IUpdateProfile,
  IUpdateRole,
} from "../interfaces/usecases.interface/index.js";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

class UserAuthController {
  constructor(
    private readonly getUserCases: IGetUserCases,
    private readonly changePasswordCases: IChangePasswordCases,
    private readonly changeEmailCases: IChangeEmailCases,
    private readonly getTeamMembers: IGetTeamMembers,
    private readonly updateImg: IUpdateImg,
    private readonly getAllUsers: IGetAllUsers,
    private readonly createRequest: ICreateRequest,
    private readonly updateProfileCases: IUpdateProfile,
    private readonly getRequestDetails: IGetRequests,
    private readonly joinProject: IJoinProject,
    private readonly rejectRequest: IRejectRequest,
    private readonly changeRole: IUpdateRole,
  ) {}
  async getUser(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const objectId = new mongoose.Types.ObjectId(userId);
      const response = await this.getUserCases.execute(objectId);
      res.json({
        status: response.status,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 500, message: `error on get user ${error}` });
    }
  }
  async updatePassword(req: Request, res: Response) {

    const { currentPassword, newPassword } = req.body;
    const { userId } = req.params;
    try {
      const userIdOb = new mongoose.Types.ObjectId(userId);
      const response = await this.changePasswordCases.execute(
        currentPassword,
        newPassword,
        userIdOb
      );
      res
        .status(response.status)
        .json({ message: response.message, data: response.data });
    } catch (error) {
      console.log(`Errorr on uddating password: ${error}`);
      res.status(500).json({ message: `Internel server Error:${error}` });
    }
  }
  async updateEmail(req: Request, res: Response) {
    const { email } = req.body;
    const { userId } = req.params;
    try {
      const userIdOb = new mongoose.Types.ObjectId(userId);
      const response = await this.changeEmailCases.execute(userIdOb, email);
      res
        .status(response.status)
        .json({ message: response.message, data: response.data });
    } catch (error) {
      res.status(500).json({ message: "internel server error" });
    }
  }
  async getTeamMember(req: Request, res: Response) {
    try {
      const { projectId, page = 1 } = req.query;
      const limit = 2;

      const response = await this.getTeamMembers.execute(
        projectId as string,
        Number(page),
        limit
      );
      res.status(response.status).json({
        message: response.message,
        data: response.data,
        totalItems: response.totalItems,
        totalPages: response.totalPages,
        currentPage: Number(page),
      });
    } catch (error) {
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    }
  }
  async updateImage(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      if (!req.file) {
        res.status(400).json({ message: "no files provided" });
      } else {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const userIdOb = new mongoose.Types.ObjectId(userId);
        const response = await this.updateImg.execute(dataURI, userIdOb);
        res.status(response.status).json(response.data);
      }
    } catch (error) {
      res.status(500).json({ message: `Internel Server Error: ${error}` });
    }
  }
  async updateProfile(req: Request, res: Response) {
    try {
      const { userId, field } = req.params; 
      const { value } = req.body;

      if (!field || value === undefined) {
        res.status(400).json({ error: "Field and value are required." });
        return;
      }
      await this.updateProfileCases.execute(userId, field, value);
      res.status(200).json({message:`${field} updated successfully`})
    } catch (error) {
      console.log(`Error on update profile Request : ${error}`);
      res.status(500).json({ message: "Internel Server error" });
    }
  }
  async findAllUsers(req: Request, res: Response) {
    try {
      const { page } = req.query;
      const { status, data, totalItems, totalPages } =
        await this.getAllUsers.execute(Number(page), 5);
      res.status(status).json({ data, totalItems, totalPages });
    } catch (error) {
      res.status(500).json({ message: `Internel Server Error: ${error}` });
    }
  }
  async sendRequest(req: Request, res: Response) {
    try {
      const { projectId, userId, note } = req.query;
      const newRequest = await this.createRequest.execute(
        Number(projectId),
        new ObjectId(userId as string),
        note as string
      );
      res.status(201).json(newRequest);
    } catch (error) {
      console.log(`Error on create Request : ${error}`);
      res.status(500).json({ message: "Internel Server error" });
    }
  }
  async acceptReq(req: Request, res: Response) {
    try {
      const { requestId, teamId } = req.query;
      const { userId } = req.params;
      const { status, message } = await this.joinProject.execute(
        userId as string,
        requestId as string,
        teamId as string
      );
      res.status(status).json(message);
    } catch (error) {
      console.log(`Error on aceepting request:${error}`);
      res.status(500).json({ message: "Internel Server Error" });
    }
  }
  async declineReq(req: Request, res: Response) {
    try {
      const { requestId } = req.query;
      const { status, message } = await this.rejectRequest.execute(
        requestId as string
      );
      res.status(status).json({ message });
    } catch (error) {
      console.log(`Error on declining request ${error}`);
      res.status(500).json({ message: "Internel Server Error" });
    }
  }
  async getRequest(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      if (!userId) {
        res.status(401).json({ message: "athentication failed" })
        return;
      }
      const { status, data, message } = await this.getRequestDetails.execute(
        new ObjectId(userId as string)
      );
      res.status(status).json({ data, message });
    } catch (error) {
      console.log(`Error on get Request : ${error}`);
      res.status(500).json({ message: `Internel server error` });
    }
  }

  async updateRole(req: Request, res: Response) {
    try {
      const { userId, teamId, role } = req.query;
      const { status, data, message } = await this.changeRole.execute(userId as string, teamId as string, role as ("Developer" | "TeamLead" | "ProjectManager"));
      res.status(status).json({ data, message });
    } catch (error) {
      console.log(`Error update Role : ${error}`);
      res.status(500).json({ message: "Internel server Error" });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log(error, "error on");
      res.status(500).json({ message: "Internel server error" });
    }
  }
}
export default UserAuthController;
