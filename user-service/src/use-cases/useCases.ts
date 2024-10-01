import { GitHubUser, GitHubEmail } from './../interfaces/github.interface';
import { GooglePayload } from "./../interfaces/types/googlePayload.interface";
import { response } from "./../interfaces/types/response";
import { IRepository } from "../interfaces/repository.interface";
import { IUser } from "../interfaces/types/user";
import { generateVerificationCode } from "../library/code-generator";
import mailerInterface from "../interfaces/nodemailer.interface";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongoose";
import { IJwt } from "../interfaces/jwtInterface";
import { OAuth2Client } from "google-auth-library";
import axios from "axios";
import { IGithub } from "../interfaces/github.interface";
import { ConsumeMessage } from 'amqplib';

class UseCases {
  private readonly repository: IRepository;
  private readonly nodemailer: mailerInterface;
  private readonly jwt: IJwt;
  private readonly saltRounds: number = 10;
  private googleClient: OAuth2Client;
  private githubClient: IGithub
  // private RabbitMQInstance;

  constructor(repository: IRepository, nodemailer: mailerInterface, jwt: IJwt,githubClient:IGithub) {
    this.repository = repository;
    this.nodemailer = nodemailer;
    this.jwt = jwt;
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    this.githubClient = githubClient;
  }

  async signup(userData: IUser): Promise<response> {
    try {
      console.log(userData);
      const user = await this.repository.findByEmail(userData.email);
      if (user && user.isVerified) {
        console.log("user is verified");
        return {
          status: 400,
          message: "User already exists",
        };
      }

      const hashedPassword = await bcrypt.hash(
        userData.password,
        this.saltRounds
      );
      const hashedUser = { ...userData, password: hashedPassword };

      const newUser = await this.repository.insertOne(hashedUser);
      const verificationCode = generateVerificationCode();
      await this.repository.saveOtp(newUser.id, verificationCode);
      const res = this.nodemailer.sendMail(userData.email, verificationCode);

      if (res) {
        return {
          status: 201,
          message: "User created successfully",
          data: newUser,
        };
      } else {
        console.log("OTP failed");
        return {
          status: 400,
          message: "OTP send failed, try again",
        };
      }
    } catch (error) {
      console.log(`error on signup usecase:${error}`);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
  async verifyOtp(userId: ObjectId, otp: number): Promise<response> {
    try {
      const isOtpValid = await this.repository.verifyOtp(userId, otp);
      if (!isOtpValid) {
        return {
          status: 400,
          message: "Invalid or expired OTP",
        };
      }
      await this.repository.markUserAsVerified(userId);
      return {
        status: 200,
        message: "Verification successful",
      };
    } catch (error) {
      console.error(`Error in verify OTP use case: ${error}`);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
  async resendOtp(userId: ObjectId) {
    try {
      const verificationCode = generateVerificationCode();
      await this.repository.saveOtp(userId, verificationCode);
      return {
        status: 201,
        message: "Otp created successfully",
      };
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
  async login(email: string, password: string): Promise<response> {
    try {
      const user = await this.repository.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return {
          status: 401,
          message: "invalid credentials OR user is not there",
          valid: false,
        };
      }

      const accessToken = this.jwt.createAccessToken(
        String(user.id),
        user.isProjectManager ? "ProjectManager" : "Developer"
      );
      const refreshToken = this.jwt.createRefreshToken(
        String(user.id),
        user.isProjectManager ? "ProjectManager" : "Developer"
      );

      return {
        status: 200,
        message: "Login successfully completed",
        tokens: { accessToken, refreshToken },
      };
    } catch (error) {
      console.log("error on login", error);
      return { status: 500, message: "Internal server error" };
    }
  }
  async googleLogin(token: string): Promise<response> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload: GooglePayload | undefined = ticket.getPayload();
      if (!payload) {
        return {
          status: 401,
          message: "Invalid Google token",
        };
      }

      const { email, name } = payload;
      let user = await this.repository.findByEmail(email as string);
      if (!user && email && name) {
        user = await this.repository.insertOne({
          email,
          username: name,
          password: "",
          role: "",
          isVerified: true,
        });
      }
      if (user && email && name) {
        const accessToken = this.jwt.createAccessToken(
          String(user.id),
          user.isProjectManager ? "ProjectManager" : "Developer"
        );
        const refreshToken = this.jwt.createRefreshToken(
          String(user.id),
          user.isProjectManager ? "ProjectManager" : "Developer"
        );
        console.log(
          `access token: ${accessToken} , refreshToken: ${refreshToken}`
        );
        return {
          status: 200,
          tokens: {
            accessToken,
            refreshToken,
          },
          message: "Login successfully completed",
        };
      }
      return {
        status: 401,
        message: "Invalid Google token",
      };
    } catch (error) {
      console.error("Error during Google login:", error);
      return { status: 500, message: "Internal server error" };
    }
  }
  async gitHubLogin(code: string): Promise<response> {
    try {
      const accessToken =await this.githubClient.getGitHubAccessToken(code)
      const response:{ user: GitHubUser | null; email: string | null } | null  = await this.githubClient.getGitHubUserData(accessToken);
      if(response?.email && response?.user){
        let user = await this.repository.findByEmail(response?.email);
        
        if(!user){
          user = await this.repository.insertOne({
            email:response.email,
            username: response.user.login,
            password: "",
            role:"developer",
            isVerified: true,
          });
        }

        const accessToken = this.jwt.createAccessToken(
          String(user.id),
          user.isProjectManager ? "ProjectManager" : "Developer"
        );
        const refreshToken = this.jwt.createRefreshToken(
          String(user.id),
          user.isProjectManager ? "ProjectManager" : "Developer"
        );
        
        return {
          status: 200,
          tokens: {
            accessToken,
            refreshToken,
          },
          message: "Login successfully completed",
        };
      }else{
        return {
          status: 401,
          message: "Invalid GitHub token",
        };
      }
      } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: "Internel Server Error",
      };
    }
  }

  async validateToken(token: string): Promise<response> {
    try {
      console.log(`validateToken`, token);
      const decoded = this.jwt.verifyToken(token);
      console.log(
        `decoded:
        
        `,
        decoded
      );
      if (decoded) {
        console.log("token valid");
        return {
          status: 200,
          message: "Token is valid",
          valid: true,
        };
      } else {
        console.log("token invalid");
        return {
          status: 401,
          message: "Token is invalid",
          valid: false,
        };
      }
    } catch (error) {
      console.error(`Error validating token: ${error}`);
      return {
        status: 500,
        message: "Internal server error",
      };
    }
  }
  
  async createTeam(message:ConsumeMessage){
    const response = JSON.parse(message.content.toString())
    await this.repository.createTeam(response);
  }
}

export default UseCases;
