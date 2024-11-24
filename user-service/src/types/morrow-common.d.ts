declare module "morrow-common" {

  export const JWTService: {
    createAccessToken: (id: string, role: string) => string;
    createRefreshToken: (id: string, role: string) => string;
    verifyToken: (token: string) => JwtPayload | null;
  };

  export const delay: (ms: number) => Promise<void>;

  export { UserRequest,UserServiceServer,UserServiceClient,TeamResponse,UserServiceService,environmentVariables} from 'morrow-common';
  
}
