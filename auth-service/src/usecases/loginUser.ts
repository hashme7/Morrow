import { IRepository } from "../interface/repository.interface";
import bcryptjs from 'bcryptjs'
import { IResponse } from "../interface/responses.interface";
import { JWTService } from "morrow-common";

export class LoginUser {
    constructor(private repository:IRepository){}

    async execute(email: string, password: string): Promise<IResponse> {
        try {
          console.log(`password ${password}`)
          const user = await this.repository.findByEmail(email);
          if (!user || !(await bcryptjs.compare(password, user.password))) {
            return {
              status: 401,
              message: "invalid credentials OR user is not there"
            };
          }
          
          const accessToken = JWTService.createAccessToken(
            String(user._id),
            user.isProjectManager ? "ProjectManager" : "Developer"
          );
          const refreshToken =JWTService.createRefreshToken(
            String(user._id),
            user.isProjectManager ? "ProjectManager" : "Developer"
          );
          return {
            status: 200,
            message: "Login successfully completed",
            tokens: { accessToken, refreshToken },
            userId:user._id
          };
        } catch (error) {
          return { status: 500, message: "Internal server error" };
        }
      }
}