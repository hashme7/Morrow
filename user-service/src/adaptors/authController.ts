import mongoose from "mongoose";
import {
  IChangeEmailCases,
  IChangePasswordCases,
  ICreateRequest,
  IGetAllUsers,
  IGetTeamMembers,
  IGetUserCases,
  IGithubLoginCases,
  IGoogleLoginCases,
  ILoginCases,
  IResendOtpCases,
  ISignUpCases,
  IUpdateImg,
  IUpdateProfile,
  IValidateTokenCases,
  IVerifyCases,
} from "./../interfaces/use-case.interface";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

class UserAuthController {
  constructor(
    private readonly signUpCases: ISignUpCases,
    private readonly verifyOtpCases: IVerifyCases,
    private readonly resendOtpCases: IResendOtpCases,
    private readonly loginCases: ILoginCases,
    private readonly googleLoginCases: IGoogleLoginCases,
    private readonly githubLoginCases: IGithubLoginCases,
    private readonly validateTokenCases: IValidateTokenCases,
    private readonly getUserCases: IGetUserCases,
    private readonly changePasswordCases: IChangePasswordCases,
    private readonly changeEmailCases: IChangeEmailCases,
    private readonly getTeamMembers: IGetTeamMembers,
    private readonly updateImg: IUpdateImg,
    private readonly getAllUsers:IGetAllUsers,
    private readonly createRequest:ICreateRequest,
    // private readonly getRequests:IGetRequests
    private readonly updateProfileCases:IUpdateProfile
  ) {
    this.signUpCases = signUpCases;
    this.verifyOtpCases = verifyOtpCases;
    this.resendOtpCases = resendOtpCases;
    this.loginCases = loginCases;
    this.googleLoginCases = googleLoginCases;
    this.githubLoginCases = githubLoginCases;
    this.validateTokenCases = validateTokenCases;
    this.getUserCases = getUserCases;
    this.changePasswordCases = changePasswordCases;
    this.changeEmailCases = changeEmailCases;
    this.getTeamMembers = getTeamMembers;
    this.updateImg = updateImg;
    this.getAllUsers = getAllUsers;
    this.createRequest = createRequest;
    // this.getRequests = getRequests
  }
  async signup(req: Request, res: Response) {
    try {
      const userData = req.body;
      const response = await this.signUpCases.execute(userData);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.log(`error on userAuth controller ${error} `);
    }
  }
  async verifyOtp(req: Request, res: Response) {
    try {
      const { otp, userId } = req.body;
      const response = await this.verifyOtpCases.execute(userId, otp);
      res.status(response.status).json(response.message);
    } catch (error) {
      console.log(error);
    }
  }
  async resendOtp(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const response = await this.resendOtpCases.execute(userId);
      res.status(response.status).json(response.message);
    } catch (error) {
      console.log(error);
    }
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await this.loginCases.execute(email, password);

      if (result.status === 200 && result.tokens) {
        const { accessToken, refreshToken } = result.tokens;
        const { userId } = result;

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
          message: "Login successful",
          accessToken,
          refreshToken,
          userId,
        });
      } else {
        res
          .status(result.status)
          .json({ message: result.message, token: result.tokens });
      }
    } catch (error: any) {
      console.log("Error on login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async googleLogin(req: Request, res: Response) {
    try {
      console.log(`on google login......`);
      const { token } = req.body;
      if (!token) {
        res.status(401).json({ message: "Missing token" });
      }
      const { status, message, tokens, userId } =
        await this.googleLoginCases.execute(token);
      res.status(status).json({
        message: message,
        refreshToken: tokens.refreshToken,
        accessToken: tokens.accessToken,
        userId,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internel Server Error" });
    }
  }
  async gitHubLogin(req: Request, res: Response) {
    try {
      const { code } = req.body;
      if (!code) {
        res.status(401).json({ message: "missing code for github" });
      }
      const { status, message, tokens, userId } =
        await this.githubLoginCases.execute(code);
      res.status(status).json({
        message: message,
        refreshToken: tokens?.refreshToken,
        accessToken: tokens?.accessToken,
        userId,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internel Server Error" });
    }
  }

  async validateToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(400).json({ message: "Token not provided" });
      } else {
        const { status, valid, message } =
          await this.validateTokenCases.execute(token);
        res.status(status).json({ status, valid, message });
      }
    } catch (error) {
      console.error("Error validating token:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

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
    console.log(req.body, "req.bdoy of updatePassword");

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
      console.log(req.file,"_____")
      const { userId } = req.params;
      if (!req.file) {
        res.status(400).json({ message: "no files provided" });
      }else{
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
  async updateProfile(req:Request,res:Response){
    try {
      
      const { userId, field } = req.params;  // Extract userId and field from URL
    const { value } = req.body; 
    console.log()
  
        if (!field || value === undefined) {
          res.status(400).json({ error: "Field and value are required." });
          return;
        }
        await this.updateProfileCases.execute(userId,field,value);
    } catch (error) {
      console.log(`Error on update profile Request : ${error}`);
      res.status(500).json({message:"Internel Server error"})
    }
  }
  async findAllUsers(req:Request,res:Response){
    try {
      const {page} = req.query;
      const {status,data,totalItems,totalPages} = await this.getAllUsers.execute(Number(page),5);
      res.status(status).json({data,totalItems,totalPages})
    } catch (error) {
      res.status(500).json({message:`Internel Server Error: ${error}`})
    }
  }
  async sendRequest(req:Request,res:Response){
    try {
      const {projectId,userId}= req.query;
      const {status,message}= await this.createRequest.execute(Number(projectId) ,new ObjectId(userId as string));
      res.status(status).json({message});
    } catch (error) {
      console.log(`Error on create Request : ${error}`);
      res.status(500).json({message:"Internel Server error"})
    }
  }
  // async getRequest(req:Request,res:Response){
  //   try {
  //     const {userId}= req.query;
  //     const {status,data,message} = await this.getRequests.execute(new ObjectId(userId as string));
  //     res.status(status).json({data,message});
  //   } catch (error) {
  //     console.log( `Error on get Request : ${error}`);
  //     res.status(500).json({message:`Internel server error`});
  //   }
  // }
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
