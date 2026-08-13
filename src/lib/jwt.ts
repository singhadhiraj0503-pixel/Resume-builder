import { JWTPayload } from "@/types/user.types";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.log("JWT secret not defined in the environment variables");
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET!, {
    expiresIn: "1hr",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET!);
};
