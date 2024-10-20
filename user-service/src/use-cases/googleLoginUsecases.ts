import { OAuth2Client } from "google-auth-library";
import { IRepository } from "../interfaces/repository.interface";
import { response } from "../interfaces/types/response";
import { GooglePayload } from "../interfaces/types/googlePayload.interface";
import { JWTService } from "morrow-common";

export class GoogleLogin{
    private readonly repository:IRepository;
    private googleClient: OAuth2Client;
    constructor(repository:IRepository){
        this.repository = repository
        this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }
    async execute(token: string): Promise<response> {
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
            const accessToken = JWTService.createAccessToken(
              String(user.id),
              user.isProjectManager ? "ProjectManager" : "Developer"
            );
            const refreshToken = JWTService.createRefreshToken(
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
}