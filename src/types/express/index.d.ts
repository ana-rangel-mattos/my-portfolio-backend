import "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface UserPayload extends JwtPayload {
    userId: string;
    username: string;
  }
}

declare global {
  namespace Express {
    export interface Request {
      userInfo: UserPayload;
    }
  }
}
