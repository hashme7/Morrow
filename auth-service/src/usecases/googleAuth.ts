import { OAuth2Client } from 'google-auth-library';
import { IRepository } from '../interface/repository.interface';
import { GooglePayload, IResponse } from '../interface/responses.interface';
import { IGoogleAuth } from './../interface/usecase.interface/index';
import { JWTService } from 'morrow-common';
export class GoogleAuth implements IGoogleAuth{ 
    private googleClient: OAuth2Client;
    constructor(private repository:IRepository){
        this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    }
    async execute(token: string): Promise<IResponse> {
        try {
            const ticket = await this.googleClient.verifyIdToken({
              idToken: token,
              audience: process.env.GOOGLE_CLIENT_ID,
            });
      
            const payload: GooglePayload | undefined = ticket.getPayload();
            console.log(`"payload..........."
              
              ${payload}
              
              `)
            if (!payload) {
              console.log("invalid google authentication..........");
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
                  isVerified: true,
                  image: '',
                  fullName: '',
                  basedIn: '',
                  jobTitle: ''
              });
            }
            if (user && email && name) {
              const accessToken = JWTService.createAccessToken(
                String(user._id),
                user.isProjectManager ? "ProjectManager" : "Developer"
              );
              const refreshToken = JWTService.createRefreshToken(
                String(user._id),
                user.isProjectManager ? "ProjectManager" : "Developer"
              );
              console.log(
                `access token: ${accessToken} , refreshToken: ${refreshToken}`
              );
              return {
                status: 200,
                tokens:{
                    accessToken,
                    refreshToken,
                },
                message: "Login successfully completed",
                userId:user._id
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