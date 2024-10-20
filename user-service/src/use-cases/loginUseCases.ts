import { IRepository } from "../interfaces/repository.interface";
import bcrypt from 'bcryptjs'
import { response } from "../interfaces/types/response";
import {JWTService} from 'morrow-common'

export class Login {
    private readonly repository;
    constructor(repository:IRepository){
        this.repository = repository
    }

    async execute(email: string, password: string): Promise<response> {
        try {
          const user = await this.repository.findByEmail(email);
          if (!user || !(await bcrypt.compare(password, user.password))) {
            return {
              status: 401,
              message: "invalid credentials OR user is not there",
              valid: false,
            };
          }
    
          const accessToken = JWTService.createAccessToken(
            String(user.id),
            user.isProjectManager ? "ProjectManager" : "Developer"
          );
          const refreshToken =JWTService.createRefreshToken(
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
}