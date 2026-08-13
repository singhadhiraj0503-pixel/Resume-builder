import { connectToDB } from "@/lib/database";
import { generateToken } from "@/lib/jwt";
import userModel from "@/models/user.model";
import { APIResponse } from "@/types/api.types";
import { LoginBody } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const body: LoginBody = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    const isExisted = await userModel.findOne({ email });

    if (!isExisted) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }

    const matchPass = isExisted.comparePass(password);

    if (!matchPass) {
      return NextResponse.json<APIResponse>(
        {
          success: false,
          message: "Invalid Credentials",
        },
        { status: 401 },
      );
    }

    const token = generateToken({ userId: isExisted._id });

    const response = NextResponse.json<APIResponse>(
      {
        success: true,
        message: "User Logged In Successfully",
        data: {
          user: {
            _id: isExisted._id,
            name: isExisted.name,
            email: isExisted.email,
          },
        },
      },
      { status: 201 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    return response;
  } catch (error) {
    console.log("Error in Logging API!!", error);
    return NextResponse.json<APIResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
};
