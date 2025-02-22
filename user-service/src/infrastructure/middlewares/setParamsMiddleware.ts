import { NextFunction, Request, Response } from "express";
import { JWTService } from "morrow-common";

export const modify = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies,'request.cookies')
  const cookies = req.headers.cookie
    ? Object.fromEntries(
        req.headers.cookie.split("; ").map((c) => c.split("="))
      )
      : {};
    
    // if (req.cookies.accessToken && req.cookies.refreshToken) {
    //     console.log("refresh token and access token is there...",req.cookies.accessToken)
    // }
  console.log(`
        +++++++++++++++++++++++
        cookies:${cookies.accessToken}, ${cookies.refreshToken}
        
        +++++++++++++++++++++++
        `);
  const decodedAt = JWTService.verifyToken(cookies.accessToken);
  console.log(`

        .................................
        decodedAt:- ${decodedAt}
        .................................
        `);
  if (decodedAt) {
    req.params.userId = decodedAt.id;
  }
  next();
};
