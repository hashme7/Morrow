import { GitHubUser, IGithub } from "../interfaces/github.interface";
import { IRepository } from "../interfaces/repository.interface";
import { response } from "../interfaces/types/response";
import { JWTService } from "morrow-common";

export class gitHubLogin {
    private readonly repository:IRepository;
    private readonly gitHubClient;
    constructor(repository:IRepository,gitHubClient:IGithub){
        this.repository = repository;
        this.gitHubClient = gitHubClient;
    }

    async execute(code: string): Promise<response> {
        try {
          const accessToken =await this.gitHubClient.getGitHubAccessToken(code)
          const response:{ user: GitHubUser | null; email: string | null } | null  = await this.gitHubClient.getGitHubUserData(accessToken);
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
    
            const accessToken = JWTService.createAccessToken(
              String(user.id),
              user.isProjectManager ? "ProjectManager" : "Developer"
            );
            const refreshToken = JWTService.createRefreshToken(
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
}