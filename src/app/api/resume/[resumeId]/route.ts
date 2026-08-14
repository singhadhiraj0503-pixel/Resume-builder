import { connectToDB } from "@/lib/database";
import { getCurrentUser } from "@/lib/getCurrentUser";
import resumeModel from "@/models/resume.model";
import { APIResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) => {
  try {
    await connectToDB();

    const user = await getCurrentUser();

    const { resumeId } = await params;

    const resume = await resumeModel.findOne({
      _id: resumeId,
      user_id: user.user_id,
    });

    if (!resume) {
      return NextResponse.json<APIResponse>(
        { success: false, message: "Resume not found" },
        { status: 404 },
      );
    }

    return NextResponse.json<APIResponse>(
      { success: true, message: "Resume fetched successfully", data: resume },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in GET resume API!!", error);
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) => {
  try {
    await connectToDB();

    const user = await getCurrentUser();

    const body = await req.json();

    const { resumeId } = await params;

    const updateResume = await resumeModel.findOneAndUpdate(
      {
        _id: resumeId,
        user_id: user.userId,
      },
      { $set: body },
      { new: true, runValidators: true },
    );

    if (!updateResume) {
      return NextResponse.json<APIResponse>(
        { success: false, message: "Failed to update the Resume" },
        { status: 400 },
      );
    }

    return NextResponse.json<APIResponse>(
      {
        success: true,
        message: "Resume updated successfully",
        data: updateResume,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in PATCH resume API!!", error);
    return NextResponse.json<APIResponse>(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
};
