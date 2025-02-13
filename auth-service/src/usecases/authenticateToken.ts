import { JwtPayload } from "jsonwebtoken";
import { IRepository } from "../interface/repository.interface";
import { IValidateResponse } from "../interface/responses.interface";
import { IAuthenticateToken } from "./../interface/usecase.interface/index";
import { JWTService } from "morrow-common";

export class AuthenticateToken implements IAuthenticateToken {
  constructor(private repository: IRepository) {}
  async execute(token: string): Promise<IValidateResponse> {
    try {
      const decoded: JwtPayload = JWTService.verifyToken(token);
      if (decoded) {
        const userData = await this.repository.findById(decoded.id);

        if (userData) { 
          return {
            status: 200,
            message: "Token is valid",
            valid: true,
            userId: userData._id,
          };
        } else {
          return {
            status: 200,
            message: "Token is valid user not foud",
            valid: true,
          };
        }
      } else {
        return {
          status: 401,
          message: "Token is invalid",
          valid: false,
        };
      }
    } catch (error) {
      return {
        valid: false,
        status: 500,
        message: "Internal server error",
      };
    }
  }
}
