import { NextFunction, Request, Response } from "express";
import { JWTService } from "./../jwt/jwt";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  const decodedAT = JWTService.verifyToken(accessToken);
  if (!decodedAT) {
    const refreshToken = req.cookies.refreshToken;
    const decodedRT = JWTService.verifyToken(refreshToken);
    if (decodedRT) {
      console.log('authorized....')
      next();
    }else{
      console.log("unauthorized........");
      res.status(401).json({message:"unathorised"});
    }
  } else {
    next();
  }
};
