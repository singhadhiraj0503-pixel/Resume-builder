import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

// export const getCurrentUser = async () => {
//   const cookieStore = await cookies();

//   const token = cookieStore.get("token")?.value;
//   if (!token) {
//     throw new Error("Token not found");
//   }

//   const decode = verifyToken(token);
//   if (!decode) {
//     throw new Error("Unauthorzied");
//   }

//   return decode.userId;
// };

export const getCurrentUser = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Token not found");
  }

  const decode = verifyToken(token);

  if (
    !decode ||
    typeof decode === "string" ||
    !("userId" in decode) ||
    typeof decode.userId !== "string"
  ) {
    throw new Error("Unauthorized");
  }

  return decode.userId;
};
