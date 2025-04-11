import { User } from '@prisma/client';

export type JwtPayload = {
  userId: number,
  role: Role
  iat: number
  exp: number
}

declare module 'express' {
  interface Request {
    user?: User;
    jwtPayload?: JwtPayload
  }
}
