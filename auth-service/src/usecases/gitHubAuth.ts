import { JWTService } from "morrow-common";
import { IRepository } from "../interface/repository.interface";
import { GitHubUser, IGithub, IResponse } from "../interface/responses.interface";
import { IGitHubAuth } from "../interface/usecase.interface";

export class GithubAuth implements IGitHubAuth{
    constructor(private  repository:IRepository,private  gitHubClient:IGithub){
    }
    async execute(code: string): Promise<IResponse> {
        try {
            const accessToken = await this.gitHubClient.getGitHubAccessToken(code)
            const response:{ user: GitHubUser | null; email: string | null } | null  = await this.gitHubClient.getGitHubUserData(accessToken);
            if(response?.email && response?.user){
              let user = await this.repository.findByEmail(response?.email);
              
              if(!user){
                user = await this.repository.insertOne({
                    email: response.email,
                    username: response.user.login,
                    password: "",
                    isVerified: true,
                    image: "",
                    fullName: "",
                    basedIn: "",
                    jobTitle: ""
                });
              }
      
              const accessToken = JWTService.createAccessToken(
                String(user._id),
                user.isProjectManager ? "ProjectManager" : "Developer"
              );
              const refreshToken = JWTService.createRefreshToken(
                String(user._id),
                user.isProjectManager ? "ProjectManager" : "Developer"
              );
              
              return {
                status: 200,
                tokens: {
                  accessToken,
                  refreshToken,
                },
                message: "Login successfully completed",
                userId:user._id
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

}