import { response } from "../interfaces/types/response";
import {
  IGithubLoginCases,
  IGoogleLoginCases,
  ILoginCases,
  IResendOtpCases,
  ISignUpCases,
  IUpdateNameCases,
  IValidateTokenCases,
  IVerifyCases,
} from "./../interfaces/use-case.interface";
import { Request, Response } from "express";

class UserAuthController {
  private readonly signUpCases: ISignUpCases;
  private readonly verifyOtpCases: IVerifyCases;
  private readonly resendOtpCases: IResendOtpCases;
  private readonly loginCases: ILoginCases;
  private readonly updateFullNameCases: IUpdateNameCases;
  private readonly googleLoginCases:IGoogleLoginCases;
  private readonly githubLoginCases:IGithubLoginCases;
  private readonly validateTokenCases:IValidateTokenCases;
  constructor(
    signUpCases: ISignUpCases,
    verifyOtpCases: IVerifyCases,
    resendOtpCases: IResendOtpCases,
    loginCases: ILoginCases,
    updateFullNameCases: IUpdateNameCases,
    googleLoginCases:IGoogleLoginCases,
    githubLoginCases:IGithubLoginCases,
    validateTokenCases:IValidateTokenCases,
  ) {
    this.signUpCases = signUpCases;
    this.verifyOtpCases = verifyOtpCases;
    this.resendOtpCases = resendOtpCases;
    this.loginCases = loginCases;
    this.updateFullNameCases = updateFullNameCases;
    this.googleLoginCases = googleLoginCases;
    this.githubLoginCases = githubLoginCases;
    this.validateTokenCases = validateTokenCases;
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

        return res.status(200).json({
          message: "Login successful",
          accessToken,
          refreshToken,
        });
      } else {
        return res
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
      const { status, message, tokens } = await this.googleLoginCases.execute(
        token
      );
      res.status(status).json({
        message: message,
        refreshToken: tokens.refreshToken,
        accessToken: tokens.accessToken,
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
        return res.status(401).json({ message: "missing code for github" });
      }
      const { status, message, tokens } = await this.githubLoginCases.execute(code);
      res.status(status).json({
        message: message,
        refreshToken: tokens?.refreshToken,
        accessToken: tokens?.accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internel Server Error" });
    }
  }

  async validateToken(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token, ".............");
    if (!token) {
      console.log("token not provided");
      return res.status(400).json({ message: "Token not provided" });
    }
    try {
      const { status, valid, message } = await this.validateTokenCases.execute(
        token
      );
      res.status(status).json({ status, valid, message });
    } catch (error) {
      console.error("Error validating token:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async updateFullName(req: Request, res: Response) {
    const { name, userId } = req.body;
    try {
      const { status, message } = await this.updateFullNameCases.execute(
        name,
        userId
      );
      res.status(status).json({ message: message });
    } catch (error) {
      console.log(`error on updateFullName ${error}`);
      res.status(500).json({ message: "Internel server error" });
    }
  }
  async logout(req: Request, res: Response) {
    console.log("logout");
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log(error, "error on");
      res.status(500).json({ message: "Internel server error" });
    }
  }
}
export default UserAuthController;
