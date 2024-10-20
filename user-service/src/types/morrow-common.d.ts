import { JwtPayload } from "jsonwebtoken";

declare module "morrow-common" {
    export const JWTService: {
      createAccessToken: (id: string, role: string) => string;
      createRefreshToken: (id: string, role: string) => string;
      verifyToken: (token: string) => JwtPayload | null;
    };
  }
  