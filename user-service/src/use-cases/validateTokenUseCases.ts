import { IRepository } from "../interfaces/repository.interface";
import { response } from "../interfaces/types/response";
import { JWTService } from "morrow-common";

export class ValidateToken {
  constructor() {}

  async execute(token: string): Promise<response> {
    try {
      console.log(`validateToken`, token);
      const decoded = JWTService.verifyToken(token);
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
}
