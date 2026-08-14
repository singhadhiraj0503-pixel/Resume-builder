import { connectToDB } from "@/lib/database";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/resume.model";
import { APIResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const userId = await getCurrentUser();

    const newResume = await resumeModel.create({
      user_id: userId,
      title: "",
      summary: "",
      personalInfo: {},
      workExperience: [],
      projects: [],
      education: [],
      certifications: [],
      skills: [],
    });

    return NextResponse.json<APIResponse>(
      {
        success: true,
        message: "Resume Created Successfully",
        data: newResume,
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error in create resume API!!", error);
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
};
