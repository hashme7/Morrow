import { NextFunction, Request, Response } from "express";
import { JWTService } from "morrow-common/dist/jwt/jwt";

export const modify = (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.headers.cookie
    ? Object.fromEntries(
        req.headers.cookie.split("; ").map((c) => c.split("="))
      )
    : {};
  console.log(`+++++++++++++++++++++++`);
  console.log(cookies);
  console.log(`+++++++++++++++++++++++`);

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
