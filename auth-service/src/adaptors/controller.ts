import { Request, Response } from "express";
import {
  IAuthenticateToken,
  ILoginUser,
  IReIssueOtp,
  ISignUp,
  IVerifyOtp,
  IGoogleAuth,
  IGitHubAuth,
} from "../interface/usecase.interface";
import { JWTService } from "morrow-common";
import dotenv from "dotenv";
dotenv.config();

export class Controller {
  constructor(
    private signup: ISignUp,
    private verifyOtp: IVerifyOtp,
    private reIssueOtp: IReIssueOtp,
    private loginUser: ILoginUser,
    private authenticateToken: IAuthenticateToken,
    private googleAuth: IGoogleAuth,
    private gitHubAuth: IGitHubAuth
  ) {}
  async signUpUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      const response = await this.signup.execute(userData);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.log(`error on userAuth controller ${error} `);
      res.status(500).json({ message: "Internel server error" });
    }
  }
  async verifyUser(req: Request, res: Response) {
    try {
      const { otp, userId } = req.body;
      const response = await this.verifyOtp.execute(userId, otp);
      res.status(response.status).json(response.message);
    } catch (error) {
      console.log(error);
    }
  }
  
  async resendOtp(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const response = await this.reIssueOtp.execute(userId);
      res.status(response.status).json(response.message);
    } catch (error) {
      console.log(error);
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const result = await this.loginUser.execute(email, password);
      if (result.status === 200 && result.tokens) {
        const { accessToken, refreshToken } = result.tokens;
        const { userId } = result;
        console.log("access token is updated ....")
        res.cookie("accessToken", accessToken, {
          httpOnly: false,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        console.log(`
          res.cookie from login : ${JSON.stringify(res.getHeaders(), null, 2)}
        `);

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
  async validateToken(req: Request, res: Response) {
    try {
      const token = req.cookies?.accessToken;
      if (!token) {
        res.status(400).json({ message: "Token not provided" });
        return;
      }
      const { status, valid, message, userId } =
        await this.authenticateToken.execute(token);
      if (valid) {
        console.log("validate complete....", status);
        res.status(status).json({ status, valid, message, userId });
        return;
      } else {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
          res.status(401).json({ message: "Refresh token not provided" });
          return;
        }
        const { id, role } = JWTService.verifyToken(refreshToken) as {
          id: string;
          role: string;
        };
        if (!id) {
          res.status(401).json({ message: "Invalid refresh token provided" });
          return;
        }
        const refreshResponse = await this.authenticateToken.execute(
          refreshToken
        );
        const newAccessToken = JWTService.createAccessToken(id, role);
        const newRefreshToken = JWTService.createRefreshToken(id, role);
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          message: "Token refreshed successfully",
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          valid: true,
          userId: refreshResponse.userId,
        });
        return;
      }
    } catch (error) {
      console.error("Error validating token:", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie("accessToken", {
        httpOnly: false,
        secure: true,
        sameSite: "none",
        
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log(error, "error on");
      res.status(500).json({ message: "Internel server error" });
    }
  }
  async googleLogin(req: Request, res: Response) {
    try {
      const { token } = req.body;
      if (!token) {
        res.status(401).json({ message: "Missing token" });
      }
      const { status, message, tokens, userId } = await this.googleAuth.execute(
        token
      );
      if (!tokens?.accessToken || !tokens?.refreshToken) {
        console.log("tokens created......");
        res.status(304).json({ message: "tokens not created..." });
        return;
      }
      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(status).json({
        message: message,
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
      const { status, message, tokens, userId } = await this.gitHubAuth.execute(
        code
      );
      if (!tokens?.accessToken || !tokens?.refreshToken) {
        console.log("tokens not created.....");
        res.status(304).json({ message: "tokens not created..." });
        return;
      }
      res.cookie("accessToken", tokens.accessToken, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(status).json({
        message: message,
        userId,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internel Server Error" });
    }
  }
}
