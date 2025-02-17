import { NextFunction, Request, Response } from "express";
import { JWTService } from "./../jwt/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  console.log(`
    
    access Token :- ${accessToken};
    
    
    `)
  const decodedAT = JWTService.verifyToken(accessToken);
  if (!decodedAT) {
    const refreshToken = req.cookies.refreshToken;
    const decodedRT = JWTService.verifyToken(refreshToken);
    if (decodedRT) {
      req.params.userId = decodedRT.id;
      console.log("req.url", req.url);
      next();
    }else{
      console.log("unauthorized........");
      res.status(401).json({message:"unathorised"});
    }
  } else {
    
    req.params.userId = decodedAT.id;
    console.log("req.url", req.url);
    next();
  }
};
