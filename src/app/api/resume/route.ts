import { connectToDB } from "@/lib/database";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/resume.model";
import { APIResponse } from "@/types/api.types";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();

    const userId = await getCurrentUser();

    if (!userId) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const resumes = await resumeModel
      .find({
        user_id: userId,
      })
      .sort({
        updatedAt: -1,
      });

    return NextResponse.json<APIResponse>(
      {
        success: true,
        message: "Resumes fetched successfully",
        data: resumes,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error in GET all resumes API:", error);

    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
};
