import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  if (!token) {
    throw new Error("Token not found");
  }

  const decode = verifyToken(token);
  if (!decode) {
    throw new Error("Unauthorzied");
  }

  return decode.userId;
};
