import { connectToDB } from "@/lib/database";
import { getCurrentUser } from "@/lib/getCurrentUser";
import userModel from "@/models/user.model";
import { APIResponse } from "@/types/api.types";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();

    const userId = await getCurrentUser();

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Current user fetched successfully",
        data: user,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in GET me API!!", error);
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
};
