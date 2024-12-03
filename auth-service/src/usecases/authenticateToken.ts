import { JwtPayload } from 'jsonwebtoken';
import { IRepository } from '../interface/repository.interface';
import { IValidateResponse } from '../interface/responses.interface';
import { IAuthenticateToken } from './../interface/usecase.interface/index';
import { JWTService } from "morrow-common";
import { IUserData } from '../interface/requests.interface';
export class AuthenticateToken implements IAuthenticateToken{
    constructor(private repository:IRepository){}
    async execute(token: string): Promise<IValidateResponse>{
        try {
            console.log(`validateToken`, token);
            const decoded:JwtPayload= JWTService.verifyToken(token);
            console.log(
              `decoded:
                  `,
              decoded
            );
            if (decoded) {
              const userData =await this.repository.findById(decoded.id);
              console.log(`
                
                
                ${userData}
                
                `)
              if(userData){
                console.log(userData._id,"fkajsdkfjakjdfkajdskfjaksjdfkajdskfjakdjfkajkdfkajkdfjkajsdkjfkajdskfjakjdfkajs")
                return {
                  status: 200,
                  message: "Token is valid",
                  valid: true,
                  userId:userData._id,
                };
              }else{
                console.log(`
                  
                 no user data is found....... 
                  
                  `)
                return {
                  status:200,
                  message:"Token is valid user not foud",
                  valid:true,
                }
              }
            } else {
              return {
                status: 401,
                message: "Token is invalid",
                valid: false,
              };
            }
          } catch (error) {
            console.error(`Error validating token: ${error}`);
            return {
              valid:false,
              status: 500,
              message: "Internal server error",
            };
          }
    }
;
}